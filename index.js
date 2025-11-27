
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
