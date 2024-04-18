// tabs
chrome.tabs.onActivated.addListener(
    function (activeInfo){
        console.debug('onActivated');
        console.debug(activeInfo);
    }
)

chrome.tabs.onHighlighted.addListener(
    function (highlightInfo){
        console.debug('onHighlighted');
        console.debug(highlightInfo);
    }
)

chrome.tabs.onUpdated.addListener(
    function (tabId,changeInfo,tab){
        console.debug('onUpdated');
        console.debug(tabId);
        console.debug(changeInfo);
        console.debug(tab);
    }
)

// webRequest
chrome.webRequest.onBeforeRequest.addListener(
    function (details){
        console.debug('onBeforeRequest');
        console.debug(details);
    },
    {urls: ['https://www.curseforge.com/*']}
)