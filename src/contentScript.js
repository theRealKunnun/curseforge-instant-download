function getModIdFromPageContent() {
    const modIdDomElement = document.querySelector("#__next > div > main > div.container.project-page > aside > div.aside-box.project-details-box > section:nth-child(2) > dl > dd:nth-child(6)");
    if (modIdDomElement) {
        return modIdDomElement.textContent.trim();
    }
    return null;
}

async function generateRandomId() {
    return Math.floor(Math.random() * (10000000 - 1 + 1)) + 1;
}

function handleWidgetDownload() {
    const widgetButton = document.querySelector("#__next > div > main > div.container.project-page > div > div.actions > div > button");
    if (widgetButton) {
        widgetButton.addEventListener('click', () => {
            const modId = getModIdFromPageContent();
            if (modId){
                setTimeout(() => {
                    const widgetDownloadButton = document.querySelector("#__next > div > main > div.container.project-page > div.modal-container > section > div.actions > button");
                    if (widgetDownloadButton) {
                        widgetDownloadButton.addEventListener('click', () => {
                            const widgetCard = document.querySelector("#__next > div > main > div.container.project-page > div.modal-container > section > div.modal-content > div.download-details > a");
                            if (widgetCard) {
                                const currentTabUrl = window.location.href;
                                window.location.href = `https://www.curseforge.com/api/v1/mods/${modId}/files/${widgetCard.getAttribute('href').split('/').pop()}/download`;
                                setTimeout(() => {
                                    window.location.href = currentTabUrl;
                                }, 700);
                            }
                        });
                    }
                }, 700);
            }
        });
    }
}

function handleDetailedDownload(){
    const detailedDownloadButton = document.querySelector("#__next > div > main > div.container.project-page > section > section > h2 > div > div > a.btn-cta.download-cta");
    if (detailedDownloadButton) {
        detailedDownloadButton.addEventListener('click', async () => {
            const modId = getModIdFromPageContent();
            if (modId){
                await chrome.declarativeNetRequest.updateSessionRules({
                    addRules: [{
                        "id": await generateRandomId(),
                        "priority": 1,
                        "action": {
                            "type": "redirect",
                            "redirect": { "regexSubstitution": `https://www.curseforge.com/api/v1/mods/${modId}/files/\\4/download` }
                        },
                        "condition": {
                            "regexFilter": "^https:\\/\\/www\\.curseforge\\.com\\/([^\\/]+)\\/([^\\/]+)\\/([^\\/]+)\\/download\\/([^\\/]+)$",
                            "resourceTypes": ["main_frame"]
                        }
                    }]
                });
            }
        });
    }
}

try {
    handleDetailedDownload();
    handleWidgetDownload();
} catch (error) {
    console.error(`IDFC Extension ERROR: ${error}`);
}