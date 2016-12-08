var player = document.getElementsByClassName("player");

if (player[0].dataset.muted != "true") {	
	//not muted
	var muteSwitch = document.getElementsByClassName("player-button--volume");
	muteSwitch[0].click();	
}
