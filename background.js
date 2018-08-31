//Background.js
//background script for ESEA Rank Displayer
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if (details.url.match("https://play.esea.net/match/*")) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(
            tabs
        ) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { action: "refreshRanks" },
                function(response) {}
            );
        });
    }
    // do your thing
});

console.log("back");