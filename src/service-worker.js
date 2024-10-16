let extractedKalturaURL = ""; // Variable to hold the extracted URL
let pendingResponse = null; // Store the pending response function

// This code fetches the URL when the event happens
chrome.webRequest.onBeforeRequest.addListener((obj) => obtainKalturaURL(obj), {
  urls: ["*://cfvod.kaltura.com/scf/hls/*"],
});

// This code extracts the URL
const obtainKalturaURL = (networkRequest) => {
  if (networkRequest.type === "xmlhttprequest") {
    const originalKalturaLink = networkRequest.url; // embedded Video
    const sourceKalturaLink = originalKalturaLink.replace("scf/hls", "pd"); // source Video

    const mp4Index = sourceKalturaLink.indexOf(".mp4");
    extractedKalturaURL =
      mp4Index !== -1
        ? sourceKalturaLink.substring(0, mp4Index + 4)
        : sourceKalturaLink;

    console.log(extractedKalturaURL);

    // If there's a pending response, send the extracted URL
    if (pendingResponse) {
      pendingResponse({ url: extractedKalturaURL });
      pendingResponse = null; // Clear the pending response
    }
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.name === "fetchVideo") {
    extractedKalturaURL = "";
    if (extractedKalturaURL) {
      sendResponse({ url: extractedKalturaURL }); // Send back the extracted URL immediately if available
    } else {
      pendingResponse = sendResponse; // Store sendResponse to call later
    }
  }
  return true; // Indicate that the response will be sent asynchronously
});



