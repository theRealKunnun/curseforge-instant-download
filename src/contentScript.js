function getModId() {
    let modId = document.querySelector("#__next > div > main > div.container.project-page > aside > div.aside-box.project-details-box > section:nth-child(2) > dl > dd:nth-child(6)");
    if (modId) {
        modId = modId.textContent.trim();
        console.debug("mod id found" + modId);
    }
    return modId;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //if active tab changed -> get modId from page and send it back to serviceWorker
    if (message.reason === "activeTabChanged") {
        console.debug("content script received message: active tab changed");
        let modId = getModId();
        (modId) ? sendResponse(modId) : sendResponse("noModIdFound")
    }
})