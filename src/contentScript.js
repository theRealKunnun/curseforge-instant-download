function getModIdFromPageContent() {
    const modIdDomElement = document.querySelector("#__next > div > main > div.ads-layout > div.ads-layout-content > div > aside > div.aside-box.project-details-box > section:nth-child(2) > dl > dd:nth-child(6)");

    if (modIdDomElement) {
        return modIdDomElement.textContent.trim();
    }
    return null;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
        // DEBUG console.debug(message, sender);

        // Get the mod id from current tab's page content.
        const modId = getModIdFromPageContent();
        // DEBUG console.debug(`Mod ID: ${modId}`);

        if (modId){
            // Handle list download.
            sendResponse(modId);

            // Handle widget download.
            const widgetButton = document.querySelector("#__next > div > main > div.ads-layout > div.ads-layout-content > div > div > div.actions > div > button");
            if (widgetButton) {
                // DEBUG console.debug(`Widget button found.`);
                widgetButton.addEventListener('click', () => {
                    // DEBUG console.debug(`Widget button clicked.`);
                    setTimeout(() => {
                        const widgetDownloadButton = document.querySelector("#__next > div > main > div.ads-layout > div.ads-layout-content > div > div.modal-container > section > div.actions > button");
                        if (widgetDownloadButton) {
                            // DEBUG console.debug(`Download button found.`);
                            widgetDownloadButton.addEventListener('click', () => {
                                // DEBUG console.debug(`Download button clicked.`);
                                const widgetCard = document.querySelector("#__next > div > main > div.ads-layout > div.ads-layout-content > div > div.modal-container > section > div.modal-content > div.download-details > a");
                                if (widgetCard) {
                                    // console.debug(`Redirected!!!!`);
                                    const currentTabUrl = window.location.href;
                                    window.location.href = `https://www.curseforge.com/api/v1/mods/${modId}/files/${widgetCard.getAttribute('href').split('/').pop()}/download`;
                                    setTimeout(() => {
                                        window.location.href = currentTabUrl
                                    }, 1000);
                                }
                            });
                        }
                    }, 1000);
                });
            }
        } else {
            sendResponse(null);
        }
    } catch (error) {
        console.debug(`IDFC Extension ERROR: ${error}`);
    }
});