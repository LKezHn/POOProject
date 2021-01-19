package Classes;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Clase para el uso de una API
 * @author POO
 * @version 1.0.1
 */
public class LyricsAPI 
{

    /**
     * Método para el uso del API.
     * @param songName El nombre de la canción
     * @return
     * @since 1.0.1
     */
	public String getLyrics(String songName)
	{
		String[] array = songName.split("_");
		String artist = array[0];
        String song = array[2];
        if(song.indexOf(".")>0)
        {
        	String finalSong = song.substring(0, song.lastIndexOf("."));
        	try 
            {
                String apiKey = "NtQunHVJIjeKGlAUWRLWYSBGRvJnl6WQEIkc5DZPGvKlsIQc7NVLN6HnvxPsZklu"; 
                String URL = String.format("https://orion.apiseeds.com/api/music/lyric/:%s/:%s?apikey=%s",artist,finalSong,apiKey);
                URL url = new URL(URL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Accept", "application/json");
                if (conn.getResponseCode() != 200) 
                {
                    throw new RuntimeException("Failed : HTTP Error code : "
                            + conn.getResponseCode());
                }
                InputStreamReader in = new InputStreamReader(conn.getInputStream());
                BufferedReader br = new BufferedReader(in);
                String output;
                while ((output = br.readLine()) != null) 
                {
                    //System.out.println(output);
                    return output;
                }
                conn.disconnect();

            } 
            catch (Exception e) 
            {
                System.out.println("Exception in NetClientGet:- " + e);
            }
    		return "null";
        }
		return "null";
	}
	
	
}
