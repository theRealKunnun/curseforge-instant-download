function getModIdFromPageContent() {
    const modIdDomElement = document.querySelector("#__next > div > main > div.container.project-page > aside > div.aside-box.project-details-box > section:nth-child(2) > dl > dd:nth-child(6)");
    if (modIdDomElement) {
        return modIdDomElement.textContent.trim();
    }
    return null;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
        const modId = getModIdFromPageContent();
        sendResponse(modId || null);
    } catch (error) {
        console.error(`IDFC Extension ERROR: ${error}`);
    }
});