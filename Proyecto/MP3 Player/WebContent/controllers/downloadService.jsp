<%@page import="Classes.FileManager"%>
<%@page import="Classes.Validate"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%><%
    
	Validate v = new Validate();
    FileManager fm = new FileManager();
    
    String eclipsePath = System.getProperty("user.dir");
    String deployPath = System.getProperty("wtp.deploy");
	String pythonFile = "/MP3Player/resources/Compress.py";
	String songPath = eclipsePath+"/Library/";
	String[] call = {"sh", "Library/runCompress.sh"};
    
	String test = fm.read(String.format("%s/%s.txt",eclipsePath,session.getAttribute("id").toString().trim()));
	String test2 = v.split(test);
    
	try
	{
		fm.writeFiles("runCompress.sh","python3 " +"'"+deployPath+pythonFile+"'"+" "+"'"+eclipsePath+"/Music.zip"+"'"+" "+
						"'"+songPath+"'"+" "+"'"+test2+"'");
		Process p = Runtime.getRuntime().exec(call);
		p.waitFor();
		if(p.exitValue()==0)
		{
			out.print("{\"status\":true}");
		}
		else
		{
			out.print("{\"status\":false}");
		}
	}
	catch (Exception e)
	{
		
	}
    
    %>