package Classes;

import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.*;

/**
 * Clase para capturar el contenido html de una página web.
 * @author POO.
 * @version 1.0.1
 */
public class Scraping {

    /**
     * Constructor de la clase.
     */
    public Scraping(){

    }

    /**
     * Recibe el nombre de la canción para añadirla a la busqueda en la página web.
     * @param song Nombre de la canción
     * @since 1.0.1
     */
    public String test(String song)
    {
    	String[] partsFind = song.split("_");
        song = "";
        song = String.format("%s %s",partsFind[0], partsFind[2]);
        song = song.substring(0, song.length() - 4);
        String link = "https://www.musica.com/letras.asp?t2=";
        String[] parts = song.split(" ");
        for(String part : parts){
            link += String.format("%s+",part);
        }
        link = link.substring(0, link.length() - 1);
        try
        {
            URL url = new URL(link);
            BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream()));
            String sb = "";
            String string;
            while((string = bf.readLine())!=null)
            {
                sb += String.format("%s",string);
            }
            bf.close();
            Pattern p = Pattern.compile("https://www\\.musica\\.com/letras\\.asp\\?letra=\\d+");
            Matcher m = p.matcher(sb);
            if(m.find() == false)
            {
                return "Letra de Cancion no Encontrada.";
            }
            else
            {
                String linkLyric = m.group(0);
                try
                {
                    URL url2 = new URL(linkLyric);
                    BufferedReader bf2 = new BufferedReader(new InputStreamReader(url2.openStream()));
                    String sb2="";
                    String string2;
                    while((string2 = bf2.readLine())!=null)
                    {
                        sb2 +=String.format("%s",string2);
                    }
                    bf.close();
                    Pattern p2 = Pattern.compile("<div id=\"letra\" style=\"text-align:center;font-size:18px\">.+alt=\"disquito - musica.com\" width=\"30\" height=\"32\"></aside></div>");
                    Matcher m2 = p2.matcher(sb2);
                    m2.find();
                    String tagP = m2.group(0);
                    
                    Pattern tag = Pattern.compile("<p>.+</p>");
                    Matcher mTag = tag.matcher(tagP);
                    mTag.find();
                    String Tag = mTag.group(0);
                    String lyricTag = Tag.replaceAll("<p>","");
                    String[] lyricClean = lyricTag.split("<br>|</p>");
                    StringBuilder lyric = new StringBuilder();

                    for(String take : lyricClean)
                    {
                        String clean = take;
                        lyric.append(clean.replaceAll("<aside class=\"bnn\">.+</aside>","")).append("<br>");
                    }
                    
                    return lyric.toString();


                }
                catch(Exception ex)
                {
                    ex.printStackTrace();
                }
            }

        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
		return "Letra de Cancion no Encontrada.";
        
    }
}

