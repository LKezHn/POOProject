package Classes;

/**
 * Clase con los métodos para la reproducción de las canciones.
 * @author POO
 * @version 1.0.1
 */
public class SongManager {

	FileManager fm = new FileManager();
	
	/**
	 * Constructor de la clase
	 */
	public SongManager() {}
	
	/**
	 * Clase que retorna si existe la canción
	 * @param song La canción
	 * @param filename Nombre
	 * @return Boolean
	 * @since 1.0.1
	 */
	public boolean exists(String song, String filename) {
		
		String[] addedSongs = fm.read(filename).split("\n");
		
		for(String addedSong : addedSongs) {
			if(addedSong.equals(String.format("%s",song.toString()))) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * Método que añade canción
	 * @param filename Nombre de la canción
	 * @return
	 * @since 1.0.1
	 */
	public String getAddedSongs(String filename) {
		
		StringBuilder content = new StringBuilder("");
		
		String[] addedSongs = fm.read(filename).split("\n");
		for( String addedSong : addedSongs) {
			content.append(String.format("%s,",addedSong));
		}
		
		return content.toString().substring(0, content.toString().length() - 1);
	}
	
	/**
	 * Método para eliminar una canción
	 * @param song Canción
	 * @param filename Nombre
	 * @since 1.0.1
	 */
	public void deleteSong(String song, String filename) {
		
		String [] addedSongs = fm.read(filename).split("\n");
		StringBuilder content = new StringBuilder("");
		
		for(String addedSong : addedSongs) {
			if(!addedSong.equals(song)){
				content.append(String.format("%s\n", addedSong));
			}
		}
		
		fm.delete(filename);
		fm.write(filename,content.toString());
		
	}
	
}
