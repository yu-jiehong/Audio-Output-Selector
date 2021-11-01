/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create all the context menu items.
*/
browser.menus.create({
  id: "audio",
  title: "Select Audio Output",
  contexts: ["all"]
}, onCreated);

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener(async (info, tab) => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendSignal).catch(onError);
});

function sendSignal(tabs) {
  browser.tabs.sendMessage(
		tabs[0].id,
		{}
	).catch(onError);
}
