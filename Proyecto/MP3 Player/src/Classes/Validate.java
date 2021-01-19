package Classes;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Clase para realizar validaciones
 * @author POO
 * @version 1.0.1
 */
public class Validate 
{
	/**
	 * Realizar corte por ,
	 * @param name Nombre
	 * @since 1.0.1
	 */
	public String split(String name)
	{
		name = name.trim();
		String test2 = name.replace("\n",",");
		return test2;
	}
	
	/**
	 * Obtiene el arte del álbum
	 * @param songFile Nombre de la canción
	 * @param albumArt Nombre del álbum
	 * @since 1.0.1
	 */
public String getAlbumArt(String songFile, String albumArt) {
		
		songFile = songFile.trim();
		StringBuilder content = new StringBuilder("");
		try
		{
			FileInputStream fis = new FileInputStream(songFile);
			InputStreamReader isr = new InputStreamReader(fis);
			BufferedReader br = new BufferedReader(isr);
			try
			{
				String line;
				while((line = br.readLine())!=null)
				{
					content.append(line);
					content.append("\n");
					if(line.matches("([\\w\\s]+)(.jpg)"))
		              {                
		                 //System.out.println(line.replaceAll("(.jpg)",""));
		                 //System.out.println("\tvalido");
						String file  = line.replaceAll("(.jpg)","");
						//System.out.println(file);
		        		 if(file.equals(albumArt))
		        		 {
		        			 return line.toString();
		        		 }                
					
		              }
					else
					{
						//System.out.print("invalid");
					}
				}return "Not Found";
			}
			finally
			{
				br.close();
			}
		}
		catch(Exception e)
		{
			return "Not Found";
		}
		
		
	}
	
	/**
	 * Valida la canción
	 * @param songFile Nombre del archivo de la canción
	 * @param songName Nombre de la canción
	 * @since 1.0.1
	 */
	public String validate(String songFile,String songName)
	{
		songFile = songFile.trim();
		StringBuilder content = new StringBuilder("");
		try
		{
			FileInputStream fis = new FileInputStream(songFile);
			InputStreamReader isr = new InputStreamReader(fis);
			BufferedReader br = new BufferedReader(isr);
			try
			{
				String line;
				while((line = br.readLine())!=null)
				{
					content.append(line);
					content.append("\n");
					if(line.matches("([\\w\\s]+)(.mp3)"))
		              {                
		                 //System.out.println(line);
		                 //System.out.println("\tvalido");
		        		 if(line.equals(songName))
		        		 {
		        			 //System.out.println(line.equals(songName));
		        			 return line.toString();
		        		 }                
					
		              }
					else
					{
						//System.out.print("invalid");
					}
				}
			}
			finally
			{
				br.close();
			}
		}
		catch(Exception e)
		{
			
		}
		return content.toString();
}
	
	/**
	 * Obtiene el contenido
	 * @param address
	 * @since 1.0.1
	 */
	public String getContent(String address) 
	{
		address = address.trim();
		StringBuilder content = new StringBuilder("");
		
		try(BufferedReader br = new BufferedReader(new FileReader(address)))
        {
           String line;
         
           while((line = br.readLine())!=null)
           {
              //System.out.println(line);
        	  if(line.matches("([\\w\\s]+)(.mp3)"))
              {                
                 //System.out.println("\tvalido");
                 content.append(
                		 String.format("%s,",line)
                	);
              }
           }
        } 
        catch (IOException e) 
        {
           e.printStackTrace();
        }
		
		try
		{
			String info = content.toString().substring(0, content.toString().length() - 1);
			return info;
			
		}
		catch(StringIndexOutOfBoundsException siobe)
		{
			return "\nNo se encontro musica en la Libreria.";
		}
	}
}
