//Background.js
//background script for TwitchMuter

//set enabled flag
var enabled = false;

//Logic for pressing the browserAction icon
chrome.browserAction.onClicked.addListener(function(tab) {
    enabled = !enabled;
    chrome.browserAction.setIcon(enabled ? { "path": "volumeUp.png" } : { "path": "volumeOff.png" });

    //go through all tabs and mute them
    if (enabled) {
        chrome.tabs.query({ currentWindow: true, url: "https://www.twitch.tv/*" }, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, { file: "intialMute.js" });
            }
        });
    }
    else {
        oldTabId = 0;
    }
});

//set the old tabs id
var oldTabId = 0;

chrome.tabs.onActivated.addListener(function(obj) {
    //if disabled
    if (!enabled)
        return;

    //Go through the current tabs
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        //If this is the first tab switch, mute the new active tab and return
        if (oldTabId == 0) {
            //set the oldtabid to the current tab
            oldTabId = tabs[0].id;
            //toggle the mute on the new active tab
            chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {});
            return;
        }

        //toggle the mute on the new active tab and the old tab
        chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {});
        chrome.tabs.sendMessage(oldTabId, {}, function(response) {});

        //change the oldtabid
        oldTabId = tabs[0].id;
    });
});
