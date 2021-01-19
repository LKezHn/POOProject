<%@page import="Classes.Scraping"%>
<%@page import="java.io.File"%>
<%@page import="Classes.Auth"%>
<%@page import="Classes.SongManager"%>
<%@page import="Classes.Constants"%>
<%@page import="Classes.LyricsAPI"%>
<%@page import="Classes.Validate"%>
<%@page import="Classes.FileManager"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%><%
	Validate v = new Validate();
    FileManager fm = new FileManager();
    LyricsAPI la = new LyricsAPI();
    SongManager sm = new SongManager();
    Scraping sc = new Scraping();
  
    String resultLyric = "#LYRIC#";
    String resultLyricHTML = "#LYRICHTML#";
    String albumConstant = "#ALBUM#";
    String result = String.format("{\"status\":\"%s\",\"songName\":\"%s\",\"albumArt\":\"%s\",\"rutaCancion\":\"%s\",\"Lyric\":%s,\"Lyric2\":\"%s\"}"
    		,Constants.resultStatus,Constants.resultSong,albumConstant,Constants.resultSongPath,resultLyric,resultLyricHTML);

	String eclipsePath = System.getProperty("user.dir");
	String deployPath = System.getProperty("wtp.deploy");
	String songList = eclipsePath+ "/Library/song.txt";
	String coverList = eclipsePath+"/Library/albumArts.txt";
	String pythonFile = "/MP3Player/resources/Copy.py";
	String[] call = {"sh", "Library/run.sh"};
	
	if(request.getParameter("song")!=null &&
		request.getParameter("cover")!= null)
    {
		String songName = request.getParameter("song").toString().trim();
		String coverArt = request.getParameter("cover").toString().trim();
		String verifiedSong = v.validate(songList,songName);
		String albumArt = v.getAlbumArt(coverList,coverArt);
		System.out.print(albumArt);
		String songPath = eclipsePath+"/Library/"+verifiedSong;
		String albumPath = eclipsePath+"/Library/"+albumArt;
		String songLyric = la.getLyrics(songName);
		String songLyricHTML = sc.test(songName);
		String finalAlbumPath = albumArt.trim().replace("\n","");
    	try
    	{
    		if(albumArt.equals("Not Found")){
  	
    		fm.writeFiles("run.sh","cd " + eclipsePath + "/Library;" + " ls -1 *.mp3 > " +eclipsePath+ "/Library/song.txt;" +
    				"cd " + eclipsePath + "/Library;" + " ls -1 *.jpg > " +eclipsePath+ "/Library/albumArts.txt;"
    					+" python3 " +deployPath+pythonFile+" '"+songPath+"'"+" "+"'"+deployPath+"/ROOT"+"'");
    		}else{
    			fm.writeFiles("run.sh","cd " + eclipsePath + "/Library;" + " ls -1 *.mp3 > " +eclipsePath+ "/Library/song.txt;" 
    					+"cd " + eclipsePath + "/Library;" + " ls -1 *.jpg > " +eclipsePath+ "/Library/albumArts.txt;"
    					+" python3 " +deployPath+pythonFile+" '"+songPath+"'"+" "+"'"+deployPath+"/ROOT"+"'; "
    					+"cp "+"'"+finalAlbumPath+"'"+" '"+deployPath+"/ROOT"+"'");
    		}
			Process p = Runtime.getRuntime().exec(call);
			p.waitFor();
			if(p.exitValue()==0)
			{
				if(verifiedSong == "Song not found" | verifiedSong == "Invalid Format")
				{
					out.print("{\"status\":false,\"content\":\"Song no existe.\"}");
				}
				else
				{	
					String location = "../"+songName;
					String coverLocation = "../"+finalAlbumPath;
					String finalSongLyricHTML = songLyricHTML.replace(":","");
					out.print(
								result.replace(Constants.resultStatus,"true").
								replace(Constants.resultSong,verifiedSong).
								replace(albumConstant,coverLocation).
								replace(Constants.resultSongPath,location).
								replace(resultLyric,songLyric).
								replace(resultLyricHTML,finalSongLyricHTML)
							);
					
					
				}
			}
			else
			{
				out.print("{\"status\":false,\"content\":\"Error en ruta de cancion.\"}");
			}
       	}
		catch(Exception e)
    	{
			
    	}
    }
	else 
		if(	(new Auth()).sessionIsValid(request,session) &&
			request.getParameter("action") != null){				
	   			if(request.getParameter("action").equals("loadData"))
			    {
					fm.writeFiles("run.sh","cd " + eclipsePath + "/Library;" + " ls -1 *.mp3 > " +eclipsePath+ "/Library/song.txt;" +
							 "cd " + eclipsePath + "/Library;" + "ls -1 *.jpg > " + eclipsePath + "/Library/albumArts.txt;");
					Process q = Runtime.getRuntime().exec(call);
					String rutaCompleta = eclipsePath+ "/Library/song.txt";
					String songsInfo = v.getContent(rutaCompleta);
					q.waitFor();
					if(q.exitValue()==0)
					{
						if(songsInfo != "")
						{
							out.print(String.format("{\"status\":true,\"content\":\"%s\"}",songsInfo.trim()));
						}
						else
						{
							out.print(
									String.format("{\"status\":false}")
								);
						}
					}
					else
					{
						out.print("{\"status\":false}");
					}
						
				}
				else 
				if( 
					request.getParameter("action").equals("addSong") &&
					request.getParameter("songName") != null
				){
					String song = request.getParameter("songName").toString().trim();
					String downloadFileName = String.format("%s.txt",session.getAttribute("id").toString().trim());
					String filename = String.format("%s",downloadFileName);
					
					if(!sm.exists(song,filename))
					{
						fm.write(String.format("%s",filename),String.format("%s\n",song));
						out.print("{\"status\": true,\"message\":\"Cancion agregada.\"}");
					}
					else
					{
					out.print("{\"status\": true,\"message\":\"Cancion ya existente.\"}");
					}
				}
				else
				if(
					request.getParameter("action").equals("deleteSong") &&
					request.getParameter("songName") != null
				)
				{
					
					String song = request.getParameter("songName").toString().trim();
					String downloadFileName = "downloadList.txt";
					String filename = String.format("%s",downloadFileName);
					
					if(sm.exists(song,filename))
					{
						sm.deleteSong(song, filename);
						out.print("{\"status\":true,\"description\":\"Cancion eliminada\"}");
					}
					
				}
				else
				if(
					request.getParameter("action").equals("loadAddedSongs")
				)
				{
					File filename = new File(String.format("%s.txt",session.getAttribute("id").toString().trim()));
					
					if(filename.exists()){
						String content = sm.getAddedSongs(filename.toString());
						out.print(
								String.format(
										"{\"status\":true,\"content\":\"%s\"}",
										content.trim()
									)
							);
					}
					else
					{
						out.print("{\"status\":false, \"description\":\"El archivo no existe.\"}");
					}
				}
		}
		else
		{
	    	
			out.print("{\"status\":false,\"content\":\"Song no existe.\"}");
		}
%>