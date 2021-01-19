/**
 * 
 */
var aboutUs = document.querySelector("input#about");
var closeTag = document.querySelector("span.close");
var modalAbout = document.querySelector("div#modalAboutUs");

var download = document.querySelector("input#download");
var closeTagDownload = document.querySelector("span.closeDownload");
var modalDownload = document.querySelector("div#modalDownload");

var lyricSeeker = document.querySelector("input#lyricSeeker");
var closeTagLyrics = document.querySelector("span.closeLyrics");
var modalLyricSeeker = document.querySelector("div#modalLyricSeeker");

aboutUs.onclick = function()
{
	
	modalAbout.style.display = "block";
}


closeTag.onclick = function()
{
	modalAbout.style.display = "none";
}

download.onclick = function()
{
	
	modalDownload.style.display = "block";
}


closeTagDownload.onclick = function()
{
	modalDownload.style.display = "none";
}

lyricSeeker.onclick = function()
{
	
	modalLyricSeeker.style.display = "block";
}


closeTagLyrics.onclick = function()
{
	modalLyricSeeker.style.display = "none";
}

function CheckBoxLyrics()
{
	var txt ="";
	var items = document.getElementsByClassName('LyricsCB');
	for (var i = 0; i < items.length; i++)
	{
	    if (items[i].checked) 
	    {
	      txt = items[i].value;

	    }
	}
	return txt;
}

let Checked = null;
var warning = document.getElementById("warning");
for (let CheckBox of document.getElementsByClassName('LyricsCB'))
{
	CheckBox.onclick = function()
	{
		if(Checked!=null)
		{
		    Checked.checked = false;
		    Checked = CheckBox;
		}
		Checked = CheckBox;
		warning.innerHTML = "";
		CheckBoxLyrics();
	}
}

window.onload = function()
{
	
	albums = document.querySelector("ul#albums");
	artists = document.querySelector("ul#artist");
	
	$.post("controllers/songService.jsp",{"action":"loadData"},
			function(data)
			{
				data = JSON.parse(data);
				
				if(data.status)
				{
					var content = `${data.content}`;
					if(content == "No se encontro musica en la Libreria.")
					{
						console.log("Error desde onload - No se encontro musica.")
					}
					else
					{
						var arr = data.content.split(",");
						var albumArr = [];
						var artistArr = [];
						for(let i = 0; i < arr.length; i++)
						{
							if(arr[i].indexOf("_") != -1){
								if(arr[i].match(/_/g).length == 2){
									var info = arr[i].split("_");
								}
							}else{
								var info = "Sin Artista_Sin Album_Sin Nombre".split("_");
							}
							
							if(albumArr.includes(info[1]) == false){
								albumArr.push(info[1]);
								albums.innerHTML += `<li onclick="albumDetails(this)"><label>${info[1]}</label></li>`;
							}
							if(artistArr.includes(info[0]) == false){
								artistArr.push(info[0]);
								artists.innerHTML += `<li onclick="artistDetails(this)"><label>${info[0]}</label></li>`;
							}
						}
						//console.log(albumArr.indexOf("Bad"))
					}
				}
				else
				{
					console.log("Error desde onload.")
				}
			});
	
	validateUser();
	getAddedSongs();

}

function getAddedSongs(){
	$.post("controllers/songService.jsp",{"action":"loadAddedSongs"},function(data){
			
			data = JSON.parse(data);
			if(data.status){
				var songs = data.content.split(",");
				var downloadTitle = document.getElementById("downloadTitle");
				var downloadInfo = document.getElementById("downloadInfo");
				var downloadDiv = document.getElementById("modalDownloadContent");
				var divContent = document.getElementById("windowContent");
				divContent.innerHTML = "";
				var button = document.createElement("button");
				button.id = "downloadButton";
				button.innerHTML = "Download";
				button.setAttribute("onclick","downloadFiles()")
				divContent.appendChild(button);
				if(songs != ""){
					downloadTitle.innerHTML = "Musica para descargar: ";
					downloadInfo.innerHTML = "Direccion de descarga es en: /eclipse/Music.zip";
					for( var i = 0; i < songs.length; i++){
						var song = `${songs[i].replace(/.mp3/g,"")}\n`;
						var checkbox = document.createElement("input");
						checkbox.type = "checkbox";
						checkbox.checked = true;
						checkbox.name = "checkboxDownload";
						checkbox.value = "Download";
						checkbox.id = songs[i];
						checkbox.setAttribute("onchange","CheckboxValues()");
						var label = document.createElement('label');
						label.htmlFor=songs[i];
						label.id = "downloads";
						label.appendChild(document.createTextNode(song));
						divContent.appendChild(checkbox);
						divContent.appendChild(label);
						divContent.appendChild(document.createElement("br"));
						
						
					}
				}
				else
				{
					var btn = document.getElementById("downloadButton");
					btn.disabled = true;
					downloadInfo.innerHTML = "";
					downloadTitle.innerHTML = "Aun no se ha añadido Musica para descargar.";
				}
				
				
			}else{
				console.log(data);
			}
		});
}

function validateUser(){
	$.post("controllers/auth.jsp",{"action":"validateUser"},function(data){
		console.log(data)
		data = JSON.parse(data);
		if(data.status){
			console.log("Correct User");
		}
		
	});
}

function getPrevious(){
	if(document.getElementById("tab").name != ""){
		var id = document.getElementById("tab").name;
		var song = document.getElementById("song").src.replace("http://localhost:8080/","").replace(/%20/g," ");
		var list = document.getElementById(id).children;
		console.log(song)
		for( var element of list){
			console.log(element)
			if(element.id == song && element.previousSibling.id != "" && element.previousSibling != null){
				console.log(element.id + song)
				play(element.previousSibling.id,element.previousSibling.childNodes[1]);
			}
		}
	}
}

function getNext(){
	if(document.getElementById("tab").name != ""){
		var id = document.getElementById("tab").name;
		var song = document.getElementById("song").src.replace("http://localhost:8080/","").replace(/%20/g," ");
		var list = document.getElementById(id).children;
		console.log("song")
		for( var element of list){
			if(element.nextSibling != null){
				if(element.id == song && element.nextSibling.id != ""){
					console.log(element.id + song)
					play(element.nextSibling.id,element.nextSibling.childNodes[1]);
				}
			}
		}
	}
}

function loadData(element){
	
	if(element == "albums"){
		node = document.querySelector("ul#albums");
	}else{
		node = document.querySelector("ul#artist");
	}
	
	$.post("controllers/songService.jsp",{"action":"loadData"},
			function(data)
			{
				data = JSON.parse(data);
				
				if(data.status)
				{
					var content = `${data.content}`;
					if(content == "No se encontro musica en la Libreria.")
					{
						console.log("Error desde onload - No se encontro musica.")
					}
					else
					{
						var arr = data.content.split(",");
						var nodeArr = [];
						for(let i = 0; i < arr.length; i++)
						{
							if(arr[i].indexOf("_") != -1){
								if(arr[i].match(/_/g).length == 2){
									var info = arr[i].split("_");
								}
							}else{
								var info = "Sin Artista_Sin Album_Sin Nombre".split("_");
							}
							var name = "";
							if(element == "albums"){
								li = `<li onclick="albumDetails(this)"><label>${info[1]}</label></li>`;
								name = info[1];
							}else{
								li = `<li onclick="artistDetails(this)"><label>${info[0]}</label></li>`;
								name = info[0];
							}
							if(nodeArr.includes(name) == false){
								nodeArr.push(name);
								node.innerHTML +=  li;
							}
							
						}
					}
				}
				else
				{
					console.log("Error desde onload.")
				}
			});
}

function albumDetails(tag){
	albums = document.querySelector("ul#albums");
	$.post("controllers/songService.jsp",
	  {"action":"loadData"},
	  function(res){
		
		  res = JSON.parse(res);
		  if(res.status){
			  
			  var songs = res.content.split(",");
			  albums.innerHTML = `<li  onclick="goBack(this);" style="list-style: none;"><label><< Volver</label></li>`;
			  for ( var i = 0; i < songs.length ; i++){
				  if(songs[i].indexOf("_") != -1){
						if(songs[i].match(/_/g).length == 2){
							var info = songs[i].split("_");
						}
					}else{
						var info = "Sin Artista_Sin Album_Sin Nombre".split("_");
					}
				  
				  if(info[1].toString().match(`${tag.textContent}`)){
					  song = info[2].replace(".mp3","");
					  console.log(songAlreadyAdded(songs[i]));
					  
					if(songAlreadyAdded(songs[i]) == true){
						  albums.innerHTML += `<li id="${songs[i]}"><input type="checkbox" onchange="addToList(this);" class="check" name="${songs[i]}" checked><label onclick="play('${songs[i]}',this);">${song}</label></li>`;
					}else{
						albums.innerHTML += `<li id="${songs[i]}"><input type="checkbox" onchange="addToList(this);" class="check" name="${songs[i]}"><label onclick="play('${songs[i]}',this);">${song}</label></li>`;
					}
				  }
			  }
			  			  
		  }
	  });
}

function artistDetails(tag){
	//TODO Realizar funcion
	console.log(tag.textContent);
	artists = document.querySelector("ul#artist");
	$.post("controllers/songService.jsp",
	  {"action":"loadData"},
	  function(res){
		
		  res = JSON.parse(res);
		  if(res.status){
			  
			  var songs = res.content.split(",");
			  artists.innerHTML = `<li onclick="goBack(this);" style="list-style: none;"><label><< Volver</label></li>`;
			  for ( var i = 0; i < songs.length ; i++){
				  if(songs[i].indexOf("_") != -1){
						if(songs[i].match(/_/g).length == 2){
							var info = songs[i].split("_");
						}
					}else{
						var info = "Sin Artista_Sin Album_Sin Nombre".split("_");
					}
				  if(info[0].toString().match(`${tag.textContent}`)){
					  song = info[2].replace(".mp3","");
					  if(songAlreadyAdded(songs[i]) == true){
						  artists.innerHTML += `<li id="${songs[i]}"><input type="checkbox" onchange="addToList(this);" class="check" name="${songs[i]}" checked><label onclick="play('${songs[i]}',this);">${song}</label></li>`;
					}else{
						artists.innerHTML += `<li id="${songs[i]}"><input type="checkbox" onchange="addToList(this);" class="check" name="${songs[i]}"><label onclick="play('${songs[i]}',this);">${song}</label></li>`;
					}
				  }
			  }
			  			  
		  }
	  });
}

function songAlreadyAdded(song){
	var songs = document.querySelectorAll("label#downloads");
	console.log(songs);
	for( var i = 0; i < songs.length; i++){
		if(songs[i].htmlFor.toString() == song){
			return true;
		}
	}return false;
}

function goBack(tag){
	console.log(true);
	name = tag.parentNode.id;
	tag.parentNode.innerHTML = "";
	loadData(name);
}

function addToList(tag){
	if(tag.checked){
		$.post("controllers/auth.jsp",{"action":"validateUser"},function(res){
			res = JSON.parse(res);
			if(res.status){
				$.post("controllers/songService.jsp",{"action":"addSong","songName":`${tag.name}`}, function(data){
					
					data = JSON.parse(data);
					if(data.status){
						getAddedSongs();
					}
				})
			}
		});
	}else{
		$.post("controllers/auth.jsp",{"action":"validateUser"},function(res){
			res = JSON.parse(res);
			if(res.status){
				$.post("controllers/songService.jsp",{"action":"deleteSong","songName":`${tag.name}`}, function(data){
					
					data = JSON.parse(data);
					if(data.status){
						getAddedSongs();
					}
					
				})
				
			}
		})
	}
}

function CheckboxValues()
{
	var items = document.getElementsByName("checkboxDownload");
	var selectedItems="";
	for(var i=0; i<items.length; i++){
		if(items[i].type=='checkbox' && items[i].checked==true)
			selectedItems+=items[i].id+"\n";
	}
	
}

function play(tag,tagName){
	var modal = document.getElementById("waitContent");
	modal.style.display = "block";
	var tab = tagName.parentNode.parentNode.id;
	var name = tag;
	var albumArtName = tag.replace(".mp3","").split("_");
	albumArtName = `${albumArtName[0]}_${albumArtName[1]}`
	console.log(albumArtName);
	var type = document.getElementById("type");
	var div = document.getElementById("tab");
	var newOptionElement = document.createElement("option");
	var optionValue = document.getElementById("songs");
	var audio = document.getElementById("song");
	var albumArt = document.getElementById("artistCover");
	$.post("controllers/songService.jsp",{"song":name,"cover":`${albumArtName}`},function(data){
		data = JSON.parse(data);
		console.log(data)
		if(data.status)
		{
			audio.src = `${data.rutaCancion}`;
			div.name = tab;
			if(data.albumArt != "../Not Found"){
				albumArt.style.backgroundImage = `url("${data.albumArt}")`;
			}else{
				albumArt.style.backgroundImage = "";
			}
			
			
			lyricsCheckBoxValue = CheckBoxLyrics();
			
			if(lyricsCheckBoxValue == "LyricsHTML")
			{
				if(optionValue.options.length > 0)
				{
					for (var i = 0; i < optionValue.options.length; i++) 
					{
						var test2 = optionValue.options[i].value;
						console.log(i,optionValue.options.length - 1,test2,optionValue.appendChild(newOptionElement).value);
						if(i == optionValue.options.length - 1)
						{
							if(test2 === optionValue.appendChild(newOptionElement).value)
							{
								optionValue.appendChild(newOptionElement).remove();
							}
							else
							{
								newOptionElement.textContent = `${data.songName}`;
								newOptionElement.id = `${data.songName}`;
								optionValue.appendChild(newOptionElement);
							}
						}	
					}
				}
				else
				{
					newOptionElement.textContent = `${data.songName}`;
					newOptionElement.id = `${data.songName}`;
					optionValue.appendChild(newOptionElement);
				}
				
				for (var i = 0; i < optionValue.options.length; i++) 
				{
					var test2 = optionValue.options[i].value;
				}
			
				
				type.innerHTML="Usando: LyricsHTML";
				if(document.getElementById("lyrics") != null)
				{
					document.getElementById("lyrics").innerHTML = "";
				}
				
				var logoDiv = document.getElementById("content");
				if(data.Lyric2 == null)
				{
					var test = document.getElementById("lyrics");
					if(typeof(test)!="undefined" && test != null)
					{
						test.innerHTML = `${"Letra de Cancion no encontrada. (Lyrics HTML)."}`;
						logoDiv.appendChild(test);
					}
					else
					{
						var lyricsDiv = document.createElement("div");
						lyricsDiv.id = "lyrics";
						lyricsDiv.style = "position:fixed; overflow-y:scroll; height:80%; width:75%; color:white;";
						lyricsDiv.innerHTML = `${"Letra de Cancion no encontrada. (Lyrics HTML)."}`;
						logoDiv.appendChild(lyricsDiv);
					}
				}
				else
				{
					var test = document.getElementById("lyrics");
					if(typeof(test)!="undefined" && test != null)
					{
						test.innerHTML = `${data.Lyric2.replace(/\n/g, "<br>")}`;
						logoDiv.appendChild(test);
					}
					else
					{
						var lyricsDiv = document.createElement("div");
						lyricsDiv.id = "lyrics";
						lyricsDiv.style = "position:fixed; overflow-y:scroll; height:80%; width:75%; color:white;";
						lyricsDiv.innerHTML = `${data.Lyric2.replace(/\n/g, "<br>")}`;
						logoDiv.appendChild(lyricsDiv);
					}
				}
			}
			else if (lyricsCheckBoxValue == "API Lyrics")
			{
				if(optionValue.options.length > 0)
				{
					for (var i = 0; i < optionValue.options.length; i++) 
					{
						var test2 = optionValue.options[i].value;
						if(i == optionValue.options.length - 1)
						{
							if(test2 === optionValue.appendChild(newOptionElement).value)
							{
								optionValue.appendChild(newOptionElement).remove();
							}
							else
							{
								newOptionElement.textContent = `${data.songName}`;
								newOptionElement.id = `${data.songName}`;
								optionValue.appendChild(newOptionElement);
							}
						}	
					}
				}
				else
				{
					newOptionElement.textContent = `${data.songName}`;
					newOptionElement.id = `${data.songName}`;
					optionValue.appendChild(newOptionElement);
				}
				
				for (var i = 0; i < optionValue.options.length; i++) 
				{
					var test2 = optionValue.options[i].value;
				}
				
				type.innerHTML="Usando: API Lyrics";
				var logoDiv = document.getElementById("content");
				if(data.Lyric == null)
				{
					var test = document.getElementById("lyrics");
					if(typeof(test)!="undefined" && test != null)
					{
						test.innerHTML = `${"Letra de Cancion no encontrada. (API Lyrics)."}`;
						logoDiv.appendChild(test);
					}
					else
					{
						var lyricsDiv = document.createElement("div");
						lyricsDiv.id = "lyrics";
						lyricsDiv.style = "position:fixed; overflow-y:scroll; height:80%; width:75%; color:white;";
						lyricsDiv.innerHTML = `${"Letra de Cancion no encontrada. (API Lyrics)."}`;
						logoDiv.appendChild(lyricsDiv);
					}
				}
				else
				{
					var test = document.getElementById("lyrics");
					if(typeof(test)!="undefined" && test != null)
					{
						test.innerHTML = `${data.Lyric.result.track.text.replace(/\n/g, "<br>")}`;
						logoDiv.appendChild(test);
					}
					else
					{
						var lyricsDiv = document.createElement("div");
						lyricsDiv.id = "lyrics";
						lyricsDiv.style = "position:fixed; overflow-y:scroll; height:80%; width:75%; color:white;";
						lyricsDiv.innerHTML = `${data.Lyric.result.track.text.replace(/\n/g, "<br>")}`;
						logoDiv.appendChild(lyricsDiv);
					}
				}
			}
			else
			{
				console.log("tipo de busqueda de cancion no seleccionada.");
			}
			modal.style.display = "none";
		}
	});
	
}


function Search()
{
	var songSeeker = document.getElementById("songSeeker");
	var optionValue = document.getElementById("songs");
	var newOptionElement = document.createElement("option");
	var type = document.getElementById("type");
	var albumArt = document.getElementById("artistCover");
	$.post("controllers/songService.jsp",
			{"song":songSeeker.value,},
			function(data)
			{
				var json = JSON.parse(data);
				if(json.status)
				{
					if(json.albumArt != "../Not Found"){
						albumArt.style.backgroundImage = `url("${data.albumArt}")`;
					}else{
						albumArt.style.backgroundImage = "";
					}
					
					var songName = `${json.songName}`;
					if(optionValue.options.length > 0)
					{						
						newOptionElement.textContent = songSeeker.value;
						newOptionElement.id = songSeeker.value;
						optionValue.appendChild(newOptionElement);
						
						for (var i = 0; i < optionValue.options.length; i++) 
						{
							var test2 = optionValue.options[i].value;
							if(i != optionValue.options.length - 1)
							{
								if(test2 === optionValue.appendChild(newOptionElement).value)
								{
									optionValue.appendChild(newOptionElement).remove();
									console.log("Cancion ya añadida.");
								}
								else
								{
									songSeeker.value="";
									var audio = document.getElementById("song");
									audio.src = `${json.rutaCancion}`;
									
									var logoDiv = document.getElementById("logo");
									lyricsCheckBoxValue = CheckBoxLyrics();
									if(lyricsCheckBoxValue == "LyricsHTML")
									{
										type.innerHTML="Usando: LyricsHTML";
										if(json.Lyric2 == null)
										{
											var test = document.getElementById("lyrics");
											test.innerHTML = `${"Letra de Cancion no encontrada. (LyricsHTML)."}`;
											logoDiv.appendChild(test);
										}
										else
										{
											var test = document.getElementById("lyrics");
											test.innerHTML = `${data.Lyric2.replace(/\n/g, "<br>")}`;
											logoDiv.appendChild(test);
										}
									}
									else if(lyricsCheckBoxValue == "API Lyrics")
									{
										type.innerHTML="Usando: API Lyrics";
										if(json.Lyric == null)
										{
											var test = document.getElementById("lyrics");
											test.innerHTML = `${"Letra de Cancion no encontrada. (LyricsHTML)."}`;
											logoDiv.appendChild(test);
										}
										else
										{
											var test = document.getElementById("lyrics");
											test.innerHTML = `${json.Lyric.result.track.text.replace(/\n/g, "<br>")}`;
											logoDiv.appendChild(test);
										}
									}
									else
									{
										console.log("tipo de busqueda de cancion no seleccionada.");
									}
								}
							}
						}	
					}
					else
					{
						
						newOptionElement.textContent = songSeeker.value;
						newOptionElement.id = songSeeker.value;
						optionValue.appendChild(newOptionElement);
						songSeeker.value="";
						var audio = document.getElementById("song");
						audio.src = `${json.rutaCancion}`;	
						
						var logoDiv = document.getElementById("logo");
						var lyricsDiv = document.createElement("div");
						lyricsDiv.id = "lyrics";
						lyricsDiv.style = "position:fixed; overflow-y:scroll; height:80%; width:75%; color:white;";
						lyricsCheckBoxValue = CheckBoxLyrics();
						if(lyricsCheckBoxValue == "LyricsHTML")
						{
							type.innerHTML="Usando: LyricsHTML";
							if(json.Lyric == null)
							{
								lyricsDiv.innerHTML = `${"Letra de Cancion no encontrada. (API Lyrics)."}`;
								logoDiv.appendChild(lyricsDiv);
							}
							else
							{
								lyricsDiv.innerHTML = `${data.Lyric2.replace(/\n/g, "<br>")}`;
								logoDiv.appendChild(lyricsDiv);
							}
						}
						else if(lyricsCheckBoxValue == "API Lyrics")
						{
							type.innerHTML="Usando: API Lyrics";
							if(json.Lyric == null)
							{
								lyricsDiv.innerHTML = `${"Letra de Cancion no encontrada. (API Lyrics)."}`;
								logoDiv.appendChild(lyricsDiv);
							}
							else
							{
								lyricsDiv.innerHTML = `${json.Lyric.result.track.text.replace(/\n/g, "<br>")}`;
								logoDiv.appendChild(lyricsDiv);
							}
						}
						else
						{
							console.log("tipo de busqueda de cancion no seleccionada.");
						}

						for (var i = 0; i < optionValue.options.length; i++) 
						{
							var test2 = optionValue.options[i].value;
						}
					}	
				}	
				
				else
				{
					console.log("Cancion no Encontrada.");
				}
			}
		);

}

function downloadFiles()
{
	var downloadModal = document.getElementById("downloadModal");
	var downloadContent = document.getElementById("downloadContent");
	var downloadMessage = document.getElementById("downloadMessage");
	$.post("controllers/downloadService.jsp",
			{},
			function(data)
			{
				var json = JSON.parse(data);
				if(json.status)
				{
					downloadModal.style.display = "block";
					downloadContent.style.display = "block";
					setInterval(function()
							{
								downloadModal.style.display = "none";
								downloadContent.style.display = "none";
							},3000);
				}
				else
				{
					downloadModal.style.display = "block";
					downloadContent.style.display = "block";
					downloadMessage.innerHTML = "Fracaso, no se pudo descargar la musica."
					setInterval(function()
							{
								downloadModal.style.display = "none";
								downloadContent.style.display = "none";
							},3000);
				}
			});

}