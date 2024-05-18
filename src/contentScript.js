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
                    console.debug("IDFC Extension DEBUG: widgetButton clicked.");
                    setTimeout(() => {
                        const widgetDownloadButton = document.querySelector("#__next > div > main > div.container.project-page > div.modal-container > section > div.actions > button");
                        if (widgetDownloadButton) {
                            console.debug("IDFC Extension DEBUG: widgetDownloadButton found.");
                            widgetDownloadButton.addEventListener('click', () => {
                                console.debug("IDFC Extension DEBUG: widgetDownloadButton clicked.");
                                const widgetCard = document.querySelector("#__next > div > main > div.container.project-page > div.modal-container > section > div.modal-content > div.download-details > a");
                                if (widgetCard) {
                                    console.debug(`IDFC Extension DEBUG: widgetCard found: ${widgetCard.getAttribute('href')}`);
                                    console.debug(`IDFC Extension DEBUG: fileId is ${widgetCard.getAttribute('href').split('/').pop()}`);
                                    console.debug(`IDFC Extension DEBUG: redirect url is https://www.curseforge.com/api/v1/mods/${modId}/files/${widgetCard.getAttribute('href').split('/').pop()}/download`);
                                    const modPageUrl = window.location.href;
                                    (async () => {
                                        const response = await chrome.runtime.sendMessage(`https://www.curseforge.com/api/v1/mods/${modId}/files/${widgetCard.getAttribute('href').split('/').pop()}/download`);
                                        if (response === "OK") {
                                            window.location.href = modPageUrl;
                                        }
                                    })();
                                }
                            });
                        } else {
                            console.debug("IDFC Extension DEBUG: widgetDownloadButton NOT FUCKING found.");
                        }
                    }, 3000); // 1000 milliseconds = 1 second
                });
            }
        } else {
            sendResponse(null);
        }
    } catch (error) {
        console.error(`IDFC Extension ERROR: ${error}`);
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//             const modpageUrl = window.location.href;
//             chrome.storage.session.get(["idfc_modId"]).then((result) => {
//                 (async () => {
//                     const response = await chrome.runtime.sendMessage({reason: "download", data: { url: `https://www.curseforge.com/api/v1/mods/${result.idfc_modId}/files/${fileId}/download`}});
//                     (response === "download started") ? window.location.href = modpageUrl : undefined;
//                 })();
//             });
//         });
//         mutationObserver.disconnect();
//     }
// };
//
// chrome.storage.session.setAccessLevel({accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"});
//
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message.reason === "download") {
//         chrome.downloads.download(
//             {url: message.data.url}
//         );
//         sendResponse("download started");
//     }
// });

//////////////////////////////////////////////////////////////////////////////////////////////

// let modId = getModId();
// (modId) ? chrome.storage.session.set({idfc_modId: modId}) : undefined;
// const widgetDownloadButtonParentElement = document.querySelector("#__next > div > main > div.container.project-page");
// let mutationObserverConfig = {childList: true, subtree: true}
// let callback = function (mutationsList, observer) {
//     for (let mutation of mutationsList) {
//         if (mutation.type === 'childList') {
//             handleWidgetAppearance();
//         }
//     }
// };
// let mutationObserver = new MutationObserver(callback);
// mutationObserver.observe(widgetDownloadButtonParentElement, mutationObserverConfig);

// let handleWidgetAppearance = () => {
//     let fileId;
//     console.debug("trying....");
//     const card = document.querySelector("#__next > div > main > div.container.project-page > div.modal-container > section > div.modal-content > div.download-details.is-latest > a");
//     if (card) {
//         const link = card.getAttribute("href").split("/");
//         console.debug(`${link}`);
//         fileId = link[link.length - 1];
//         console.debug(`${fileId}`)
//     }
//     const widgetDownloadButton = document.querySelector("#__next > div > main > div.container.project-page > div.modal-container > section > div.actions > button");
//     if (widgetDownloadButton + fileId) {
//         widgetDownloadButton.addEventListener('click', function () {
//             const modpageUrl = window.location.href;
//             chrome.storage.session.get(["idfc_modId"]).then((result) => {
//                 (async () => {
//                     const response = await chrome.runtime.sendMessage({reason: "download", data: { url: `https://www.curseforge.com/api/v1/mods/${result.idfc_modId}/files/${fileId}/download`}});
//                     (response === "download started") ? window.location.href = modpageUrl : undefined;
//                 })();
//             });
//         });
//         mutationObserver.disconnect();
//     }
// };
//
// chrome.storage.session.setAccessLevel({accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"});
//
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message.reason === "download") {
//         chrome.downloads.download(
//             {url: message.data.url}
//         );
//         sendResponse("download started");
//     }
// });