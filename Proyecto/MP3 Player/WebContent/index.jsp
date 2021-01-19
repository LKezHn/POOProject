<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="Classes.Auth"%><%
    %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="styles/style.css">
		<link  rel="icon"   href="Resources/Favicon.png" type="image/png">
		<title>MP3 Player</title>
	</head>
	<body>
		<div id="main" class="main">
			<div id="content">
			
				<div id="seeker" class="seeker">
					<button id="home" class="home"></button>
					<input type="text" id="songSeeker" list="songs" class="songSeeker" placeholder="Escribe la canción, artista o álbum que deseas.(incluir extensión)">
					<datalist id="songs"></datalist>
					<button onclick="Search();" type="submit" class="searchButton" id="searchButton"><strong>Search</strong></button>
					
					<input type="button" id="about" class="about" value="About Us">
					<div id="modalAboutUs" class="modalAboutUs">
					  <!-- Modal content -->
					  <div id="modalAboutUsContent" class="modalAboutUsContent modalWindow">
					    <span class="close">&times;</span>
					    <h1 id="aboutUsTitle"><strong>MP3Player v0.1.0</strong></h1><hr>
					    <h2><strong>Proyecto #2, POO I-PAC 2020</strong></h2>
					    <ul>
					    	<li><h3>Catedrático: José Inestroza</h3></li>
					    </ul><hr>
					    <h2><strong>Desarrollado por:</strong></h2>
					    <ul>
					    	<li> <h3>Juan Carlos Boquín Izaguirre</h3></li>
					    	<li> <h3>Daniel Alessandro Arteaga Martínez</h3></li>
					    	<li> <h3>Luis Enrrique Martinez Meza</h3></li>
					    </ul><hr>
					  </div>
					</div>
					<div id="waitContent" class="modalAboutUs">
					  <!-- Modal content -->
					  <div id="modalWait" class="modalAboutUsContent modalWindow">
					    <h1 id="aboutUsTitle"><strong>Espere</strong></h1><hr>
					  </div>
					</div>
					<input type="button" id="download" class="about2" value="Download">
					<div id="modalDownload" class="modalAboutUs">
					  <!-- Modal content -->
					  <div id="modalDownloadContent" class="modalAboutUsContent modalWindow">
					    <span class="closeDownload">&times;</span>
					    <h1 id="downloadTitle"><strong>Aun no se ha añadido Musica para descargar.</strong></h1><hr>
					    <h2 id="downloadInfo"></h2>
					    <div id="downloadModal">
						    <div id="downloadContent" class="modalAboutUsContent modalWindow">
						         <h1></h1>
						
						        <p id="downloadMessage">Exito.</p>
						    </div>
						</div>
					    <div id="windowContent"></div>
					  </div>
					</div>
					<input type="button" onclick="location = 'lyricSearcher.jsp'" class="about4" value="Search any Lyric">
					<input type="button" id="lyricSeeker" class="about3" value="Lyric Searcher">
					<div id="modalLyricSeeker" class="modalAboutUs">
					  <!-- Modal content -->
					  <div id="modalLyricSeekerContent" class="modalAboutUsContent modalWindow">
					    <span class="closeLyrics">&times;</span>
					    <h1 id="aboutUsTitle"><strong>Tipo de busqueda de letras:</strong></h1><hr>
					    	<input type="checkbox" id="APILyrics" name="API Lyrics" value="API Lyrics" class="LyricsCB">API Lyrics<br>
						  	<input type="checkbox" id="LyricsHTML" name="LyricsHTML" value="LyricsHTML" class="LyricsCB">LyricsHTML<br>
						  	
					  </div>
					</div>
				</div>
				<div id="musicPlayer" class="musicPlayer">
					<button onclick="getPrevious()" id="previous">Anterior</button>
					<button onclick="getNext()" id="next">Siguiente</button>
					<audio id="song" src="" controls="controls" autoplay>
					</audio>
					<input id="tab" type="hidden" name="">
				</div>
				<div id="background" class="background">
					<h1 id="titlealbums" class="titlealbums">Albums</h1>
					 <ul id="albums" class="albums"></ul>
					<h1 id="titleartist" class="titleartist">Artistas</h1>
					<ul id="artist" class="artist"></ul>	
				</div>
				<div id="artistCover" class="artistCover"></div>
			</div>
			<div id="logo" class="logo">
			</div>
			<h3 id="type"><strong></strong></h3>
		</div>
		<script src="scripts/jquery-3.4.1.js"></script>
		<script src="scripts/script.js"></script>
	</body>
</html>