var callback = function(info) {
    return {
        responseHeaders: info.responseHeaders.concat([{
            name: 'access-control-allow-origin',
            value: '*' 
        }]),
        redirectUrl: 'https://cdn.jsdelivr.net/gh/onurdumangoz/nesine.com.tamekran/LiveBroadcast.min.js'
    };  
};

var filter = { urls: [ '*://*.nesine.com/*/LiveBroadcast.min.js*' ], types: ['script'] };
var opt_extraInfoSpec = [ 'blocking', 'responseHeaders' ];

chrome.webRequest.onHeadersReceived.addListener(callback, filter, opt_extraInfoSpec);

chrome.browserAction.onClicked.addListener(function(tab) {
    window.open('https://github.com/onurdumangoz/nesine.com.tamekran', '_blank').focus();
});