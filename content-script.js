browser.runtime.onMessage.addListener(async () => {
	if(!navigator.mediaDevices.selectAudioOutput) {
		alert('Browser Permission Required.\n\nGo to about:config in your address bar.\nClick on "Accept the Risk and Continue" if prompted.\nType into the search bar "media.setsinkid.enabled" (without quotes).\nSet the value to "true".');
	}
	else {
		const selected = await navigator.mediaDevices.selectAudioOutput();
		const audioDevices = document.querySelectorAll('audio, video');
		audioDevices.forEach(e => e.setSinkId(selected.deviceId));
	}
});
