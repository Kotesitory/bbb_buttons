function waitForElement(querySelector, timeout=0){
	const startTime = new Date().getTime();
	return new Promise((resolve, reject)=>{
		const timer = setInterval(()=>{
			const now = new Date().getTime();
			if(document.querySelector(querySelector)){
				clearInterval(timer);
				resolve();
			}else if(timeout && now - startTime >= timeout){
				clearInterval(timer);
				reject();
			}
		}, 100);
	});
}

// wait for video to load, then load script
waitForElement("video", 200000).then(function(){

	// Update seek and speed values in the settings panel in firefox.
	function onError(error) {
		console.log(`Error: ${error}`);
	}

	function onGot(item) {
		if (item.seekOffset) {
			seekOffset = parseInt(item.seekOffset);
		}
		if (item.speedOffset){
			speedOffset = parseFloat(item.speedOffset);
		}

	}

	let getting_seek = browser.storage.sync.get("seekOffset");
	getting_seek.then(onGot, onError);
	let getting_speed = browser.storage.sync.get("speedOffset");
	getting_speed.then(onGot, onError);

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
	var darkMode = false;
	var TRANSITION_DURATION = "1s";

// colors
	var TEXT_PRIMARY = "#666666"
	var TEXT_PRIMARY_DARK_MODE = "#fafafa"
	var DARK_BACKGROUND = "#212121"
	var LIGHT_BACKGROUND = "white"

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

	function toggleDarkMode(){
		darkMode = !darkMode;
		if(darkMode){
			navBar.style.backgroundColor = DARK_BACKGROUND;
			recordingTitle.style.color = TEXT_PRIMARY_DARK_MODE;
			sidebarIcon.style.color = TEXT_PRIMARY_DARK_MODE;
			chat.style.backgroundColor = DARK_BACKGROUND;
			chat.style.color = TEXT_PRIMARY_DARK_MODE;
			chat_area.style.backgroundColor = DARK_BACKGROUND;
			chatAreaSecond.style.backgroundColor = DARK_BACKGROUND;
			div.style.color = TEXT_PRIMARY_DARK_MODE;
			playBack.style.backgroundColor = DARK_BACKGROUND;

			btnToggleDarkMode.innerText = "Light"
			btnToggleDarkMode.style.color = TEXT_PRIMARY;
			btnToggleDarkMode.style.backgroundColor = LIGHT_BACKGROUND;
		}
		else{
			navBar.style.backgroundColor = LIGHT_BACKGROUND
			recordingTitle.style.color = TEXT_PRIMARY;
			sidebarIcon.style.color = TEXT_PRIMARY;
			chat.style.backgroundColor = LIGHT_BACKGROUND;
			chat.style.color = TEXT_PRIMARY;
			chat_area.style.backgroundColor = LIGHT_BACKGROUND;
			chatAreaSecond.style.backgroundColor = LIGHT_BACKGROUND;
			div.style.color = TEXT_PRIMARY;
			playBack.style.backgroundColor = LIGHT_BACKGROUND;

			btnToggleDarkMode.innerHTML = "Dark";
			btnToggleDarkMode.style.color = TEXT_PRIMARY_DARK_MODE;
			btnToggleDarkMode.style.backgroundColor = DARK_BACKGROUND;
		}
	}

	function setTransitions() {
		navBar.style.transitionDuration = TRANSITION_DURATION
		recordingTitle.style.transitionDuration = TRANSITION_DURATION
		sidebarIcon.style.transitionDuration = TRANSITION_DURATION
		chat.style.transitionDuration = TRANSITION_DURATION
		chat_area.style.transitionDuration = TRANSITION_DURATION
		chatAreaSecond.style.transitionDuration = TRANSITION_DURATION
		playBack.style.transitionDuration = TRANSITION_DURATION
		div.style.transitionDuration = TRANSITION_DURATION
		btnToggleDarkMode.style.transitionDuration = TRANSITION_DURATION
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
	var btnToggleDarkMode = createButton(DARK_BACKGROUND, "Dark", toggleDarkMode, true)
	chat_area = document.getElementById('chat-area');
	chat_area.insertBefore(btn_div, chat_area.firstChild);
	document.onkeydown = checkKey;

	var navBar = document.getElementById("navbar")
	var recordingTitle = document.getElementById("recording-title")
	var sidebarIcon = document.getElementsByClassName("sidebar-icon").item(0)
	var emptyVideoArea = document.getElementById("video")
	emptyVideoArea.style.height = "1px";
	var chat = document.getElementById("chat")
	chat.style.border = "0px";
	var chatAreaSecond = document.getElementsByClassName("inner-wrap").item(0)
	var playBack = document.getElementById("main-section")

	setTransitions()

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

}).catch(()=>{
	alert("element did not load in 200 seconds");
});