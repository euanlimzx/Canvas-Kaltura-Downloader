document.getElementById("fetch").addEventListener("click", async function () {
  document.getElementById("fetch").remove();

  const spinner = createLoadingSpinner();
  const buttonContainer = document.getElementById("button-container");
  buttonContainer.appendChild(spinner);
  
  const response = await chrome.runtime.sendMessage({ name: "fetchVideo" });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: createDownloadButton(response.url),
    });
  });
});

function createDownloadButton(url) {
  const button = document.createElement("button");
  button.className = "button";
  button.id = "fetch";

  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("height", "20");
  svg.setAttribute("width", "20");
  svg.className = "button__icon";

  // Create the path elements
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("fill", "none");
  path1.setAttribute("d", "M0 0h24v24H0z");
  path1.setAttribute("stroke", "none");

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2");

  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute("d", "M7 11l5 5l5 -5");

  const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path4.setAttribute("d", "M12 4l0 12");

  // Append paths to the SVG
  svg.appendChild(path1);
  svg.appendChild(path2);
  svg.appendChild(path3);
  svg.appendChild(path4);

  // Create the span for button text
  const span = document.createElement("span");
  span.className = "button__text";
  span.innerText = "Download Video";

  // Append the SVG and span to the button
  button.appendChild(svg);
  button.appendChild(span);

  // Set up the click event
  button.addEventListener("click", () => {
    window.open(url, "_blank");
  });

  // Remove the spinner if it exists
  const spinner = document.getElementById("spinner");
  if (spinner) {
    spinner.remove();
  }
  const buttonContainer = document.getElementById("button-container");
  // Append the button to the body
  buttonContainer.appendChild(button);
}

function createLoadingSpinner() {
  // Create the main container
  const threeBodyDiv = document.createElement("div");
  threeBodyDiv.className = "three-body";
  threeBodyDiv.id = "spinner";

  // Create and append three dots
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("div");
    dot.className = "three-body__dot";
    threeBodyDiv.appendChild(dot);
  }

  return threeBodyDiv;
}
