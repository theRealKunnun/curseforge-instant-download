function getModIdFromPageContent() {
    const modIdDomElement = document.querySelector("#__next > div > main > div.container.project-page > aside > div.aside-box.project-details-box > section:nth-child(2) > dl > dd:nth-child(6)");
    if (modIdDomElement) {
        return modIdDomElement.textContent.trim();
    }
    return null;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
        // Get the mod id from current tab's page content.
        const modId = getModIdFromPageContent();

        if (modId){
            // Handle list download.
            sendResponse(modId);

            // Handle widget download.
            const widgetButton = document.querySelector("#__next > div > main > div.container.project-page > div > div.actions > div > button");
            if (widgetButton) {
                widgetButton.addEventListener('click', () => {
                    setTimeout(() => {
                        const widgetDownloadButton = document.querySelector("#__next > div > main > div.container.project-page > div.modal-container > section > div.actions > button");
                        if (widgetDownloadButton) {
                            widgetDownloadButton.addEventListener('click', () => {
                                const widgetCard = document.querySelector("#__next > div > main > div.container.project-page > div.modal-container > section > div.modal-content > div.download-details > a");
                                if (widgetCard) {
                                    const currentTabUrl = window.location.href;
                                    window.location.href = `https://www.curseforge.com/api/v1/mods/${modId}/files/${widgetCard.getAttribute('href').split('/').pop()}/download`;
                                    setTimeout(() => {
                                        window.location.href = currentTabUrl
                                    }, 700);
                                }
                            });
                        }
                    }, 700);
                });
            }
        } else {
            sendResponse(null);
        }
    } catch (error) {
        console.debug(`IDFC Extension ERROR: ${error}`);
    }
});