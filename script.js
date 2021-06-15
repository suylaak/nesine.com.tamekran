var script = document.createElement('script');
script.innerHTML = `
	var myPlayer = videojs('liveVideo');
	
	function setFullscreen() {		
		if (myPlayer.isFullscreen()) {
			myPlayer.exitFullscreen();
		} else {
			myPlayer.requestFullscreen();
		}
	}
`;

var fsButton = document.createElement('button');
fsButton.classList.add('vjs-fullscreen-control', 'vjs-control', 'vjs-button');
fsButton.type = 'button';
fsButton.title = 'Tam Ekran';
fsButton.setAttribute('aria-disabled', 'false');
fsButton.setAttribute('onclick', 'setFullscreen()');
fsButton.innerHTML = '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">Fullscreen</span>';

var checkExist = setInterval(function() {
	if (document.querySelector('#divPlayer .vjs-control-bar') != null) {
		document.body.appendChild(script);
		document.querySelector('#divPlayer .vjs-control-bar').appendChild(fsButton);		
		clearInterval(checkExist);
	}
}, 100);