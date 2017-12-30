//Capture URL and then add the required files to it

var callback = function(details) {
	if(details.method == "POST") {
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
			chrome.tabs.executeScript(tabs[0].id, { file: "js/jquery.js" }, function() {
				chrome.tabs.executeScript(tabs[0].id, { file: "js/initialize.js" }, function() {
					chrome.tabs.insertCSS(tabs[0].id, { file: "css/price-checker.css" });
					chrome.tabs.insertCSS(tabs[0].id, { file: "css/jquery.modal.min.css" });
					chrome.tabs.executeScript(tabs[0].id, { file: "js/jquery.modal.min.js" });
					chrome.tabs.executeScript(tabs[0].id, { file: "front.js" });
				});
			});
		});
	}
};
var filter = {
	urls: ["*://*/*"]
};
var opt_extraInfoSpec = [
	
];

chrome.webRequest.onCompleted.addListener(callback, filter, opt_extraInfoSpec);