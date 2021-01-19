package Classes;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;

public class FileManager 
{

	/**
	 * Lee un archivo.
	 * @param fileName El nombre del archivo a leer.
	 * @return Retorna el contenido del archivo que se leyo como un String.
	 */
	public String read(String fileName)
	{
		StringBuilder content = new StringBuilder("");
		try
		{
			FileInputStream fis = new FileInputStream(fileName);
			InputStreamReader isr = new InputStreamReader(fis);
			BufferedReader br = new BufferedReader(isr);
			try
			{
				String line;
				while((line = br.readLine())!=null)
				{
					content.append(line);
					content.append("\n");
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
	 * Escribe en un archivo sin reemplazarlo.
	 * @param fileName El archivo a escribir.
	 * @param content El contenido del archivo.
	 */
	public void write(String fileName,String content)
    {
    	try
    	{
    		
    		FileOutputStream fos = new FileOutputStream(fileName,true);
    		try
    		{
    			byte[] b = content.getBytes();
    			fos.write(b);
    		}
    		finally
    		{
    			fos.close();
    		}
    	}
    	catch(Exception e)
    	{
    		
    	}
    }
	
	/**
	 * Reescribe el contenido de un archivo.
	 * @param fileName El nombre del archivo.
	 * @param content El contenido que tiene el archivo.
	 * @throws IOException 
	 */
    public void writeFiles(String fileName,String content)
    {
    	/**
    	String rutaApache = System.getProperty("catalina.home");
    	String directory = rutaApache + "/songs";
    	boolean folder = (new File(directory)).mkdir();
    	*/
    	boolean folder = (new File("Library")).mkdir();
    	try
    	{
    		if(folder)
    		{
    			//System.out.println("Directorio creado satisfactoriamente.");
    		}
    		else
    		{
    			//System.out.println("Directorio existente.");
    		}
    		File file = new File("Library",fileName);
            // Si el archivo no existe es creado
            if (!file.exists()) {
                file.createNewFile();
            }
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(content);
            bw.close();
    	}
    	catch(Exception e)
    	{
    		
    	}
    		
	}
    
	/**
	 * Elimina un archivo.
	 * @param fileName El nombre del archivo.
	 */
	public void delete(String fileName){
		File F = new File(fileName);
		if(F.delete()){}
	}
}