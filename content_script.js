chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	//click the mute button
    $(".player-button--volume").click();
  });