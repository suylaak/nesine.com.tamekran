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
	
	document.querySelector('#divPlayer').addEventListener('DOMSubtreeModified', function(){
		if (myPlayer.player_ == null && document.querySelector('#divPlayer .vjs-control-bar') != null) {
			myPlayer = videojs('liveVideo');
		}
	});
`;

var fsButton = document.createElement('button');
fsButton.classList.add('vjs-fullscreen-control', 'vjs-control', 'vjs-button');
fsButton.type = 'button';
fsButton.title = 'Tam Ekran';
fsButton.setAttribute('aria-disabled', 'false');
fsButton.setAttribute('onclick', 'setFullscreen()');
fsButton.innerHTML = '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">Fullscreen</span>';

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

var pageSource = DOMtoString(document);

var pageObj = pageSource.match(new RegExp('{"BetListVersion"' + "(.*)" + '};'));
var pageJson = JSON.parse(pageObj[0].slice(0, -1));

function matchButton() {
	var matchCode = document.querySelector('#ddlTrackerMatches').getAttribute('data-code');
	
	var matchObject = pageJson.LiveBetList.filter(obj => {
		return obj.Code == matchCode.trim();
	});
	
	if (matchObject[0].BroadcastList.length > 0) {
		document.getElementById('ext-div').innerHTML = '<a class="btn btn-primary" href="javascript:LiveBroadcast.PlayWebPlayer(\'' + matchObject[0].BroadcastList[0].BetChannelId + '\',\'' + matchObject[0].BroadcastList[0].ProviderType + '\');">Maçı Yeni Sekmede Aç</a>';
	}
}

var checkExist = setInterval(function() {
	if (document.querySelector('#ddlTrackerMatches span.name').innerText != null && document.querySelector('#ddlTrackerMatches span.name').innerText != '') {
		
		let lis = document.querySelectorAll('#ddloverflowEllipsis li');
		for (let i = 0; i < lis.length; i++) {
			lis[i].addEventListener('click', function(){
				matchButton();
			});
		}
		
		document.querySelector('#defaultTracker .match-stream-tab-main .tab-header').insertAdjacentHTML('beforebegin', '<div style="margin: 5px 0;" id="ext-div"></div>');
		
		matchButton();
		
		document.querySelector('#ddlTrackerMatches .name').addEventListener('DOMSubtreeModified', function(){
			matchButton();
		});
		
		clearInterval(checkExist);
	}
}, 100);

var checkExist2 = setInterval(function() {
	let playerEl = document.querySelector('#divPlayer');
	
	if (playerEl) {
		let controlBarEl = playerEl.querySelector('.vjs-control-bar');
		
		if (controlBarEl) {
			document.body.appendChild(script);
			controlBarEl.appendChild(fsButton);
			clearInterval(checkExist2);
		}
	}
}, 100);

