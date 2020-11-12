var videos = document.getElementsByTagName('video');
for (i = 0; i < videos.length; i++) {
	if(videos[i].classList.contains('webcam'))
  		var audio = videos[i];
  	else
  		var video = videos[i];
}

var playbackSpeed = 1.0;
var seekOffset = 5;
var speedOffset = 0.1;

// Creating div for viewing video speed
var div = document.createElement('div');
div.height = 400;
div.width = 200;
div.innerHTML = "Video speed:" + playbackSpeed.toFixed(2);

function forward(){
	audio.currentTime += seekOffset;
  if(video != undefined && video != null)
   video.currentTime += seekOffset;
}

function back(){
	audio.currentTime -= seekOffset;
  if(video != undefined && video != null)
   video.currentTime -= seekOffset;
}

function speedUp(){
	audio.playbackRate += speedOffset;
  if(video != undefined && video != null)
   video.playbackRate += speedOffset;

	div.innerHTML = "Video speed:" + audio.playbackRate.toFixed(2);
}

function slowDown(){
	audio.playbackRate -= speedOffset;
	if(video != undefined && video != null)
    video.playbackRate -= speedOffset;

	div.innerHTML = "Video speed:" + audio.playbackRate.toFixed(2);
}

function resetSpeed(){
	audio.playbackRate = playbackSpeed;
	if(video != undefined && video != null)
       video.playbackRate = playbackSpeed;
   
	div.innerHTML = "Video speed:" + audio.playbackRate.toFixed(2);
}

function createButton(color, symbol, func, append=false){
	let btn = document.createElement('button');
	btn.width = 100;
	btn.height = 100;
	btn.style.background = color;
	btn.innerHTML = symbol;
	btn.onclick = func;
	if(append)
		btn_div.appendChild(btn);

	return btn;
}

var btn_div = document.createElement('div');
btn_div.id = "btn-div";
btn_div.style.display = "block";
btn_div.appendChild(div);
createButton('gray', '&larr;', back, true);
createButton('gray', '&rarr;', forward, true);
createButton('green', '&uarr;', speedUp, true);
createButton('red', '&darr;', slowDown, true);
createButton('light blue', 'Reset', resetSpeed, true);
chat_area = document.getElementById('chat-area');
chat_area.insertBefore(btn_div, chat_area.firstChild);
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
    	//up key
        speedUp();
    }
    else if (e.keyCode == '40') {
    	//down key
        slowDown();
    }
    else if (e.keyCode == '37') {
    	//left key
       	back();
    }
    else if (e.keyCode == '39') {
    	//right key
       	forward();
    }else if (e.keyCode == '32'){
    	//space bar
    	if(audio.paused)
    		audio.play();
    	else
    		audio.pause();
    }
}
