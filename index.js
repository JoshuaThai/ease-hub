
// Only runs when the button is clicked
document.getElementById('copyLink').addEventListener('click', function() {
    //Copy the current opened tab's URL to clipboard
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs.length > 0){
            const activeTab = tabs[0];
            const url = activeTab.url;
            navigator.clipboard.writeText(url);
        }

    });
});

document.getElementById("generateQuote").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "getQuote" }, (response) => {
    if (chrome.runtime.lastError) {
      document.getElementById("quote").innerText = "Error: " + chrome.runtime.lastError.message;
      return;
    }
    if (response?.quote) {
      document.getElementById("quote").innerText = response.quote;
    } else {
      document.getElementById("quote").innerText = "Error: " + (response?.error || "No response");
    }
  });
});

document.getElementById("backgroundSelect").addEventListener("change", (event) => {
  const selectedBackground = event.target.value;
  if (selectedBackground.includes("blue")) {
    document.body.style.backgroundColor = "lightblue";
  } else if (selectedBackground.includes("gray")) {
    document.body.style.backgroundColor = "lightgray";
  } else {
    document.body.style.backgroundColor = "white";
  }
  console.log("Selected background:", selectedBackground);
});
