var playerScript = document.createElement('script');
playerScript.innerHTML = `
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

var added = false;
var checkExist = setInterval(function() {
	let playerEl = document.querySelector('#divPlayer');
	
	if (playerEl) {
		let controlBarEl = playerEl.querySelector('.vjs-control-bar');
		
		if (controlBarEl) {
			document.body.appendChild(playerScript);
			controlBarEl.appendChild(fsButton);
			clearInterval(checkExist);
		}
	}
}, 100);
