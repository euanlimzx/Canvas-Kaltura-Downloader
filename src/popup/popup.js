document.getElementById('fetch').addEventListener('click', async function() {
  document.getElementById('fetch').remove()
  const spinner = createLoadingSpinner()
  document.body.appendChild(spinner)
  const response = await chrome.runtime.sendMessage({name: 'fetchVideo'});
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: createDownloadButton(response.url)
    });
  });
});

function createDownloadButton(url) {
  const button = document.createElement('button');
  button.innerText = 'Download Video';
  button.addEventListener('click', () => {
    window.open(url, '_blank');
  });
  document.getElementById('spinner').remove()
  document.body.appendChild(button);
}

function createLoadingSpinner() {
  // Create a div element for the spinner
  const spinner = document.createElement("div");
  spinner.id = "spinner"; // Add the spinner class for styling
  return spinner;
}
