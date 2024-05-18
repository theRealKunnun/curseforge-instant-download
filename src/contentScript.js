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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const widgetDownloadButtonParentElement = document.querySelector("#__next > div > main > div.container.project-page");
let mutationObserverConfig = {childList: true, subtree: true}
let callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            handleWidgetAppearance();
        }
    }
};
let mutationObserver = new MutationObserver(callback);
mutationObserver.observe(widgetDownloadButtonParentElement, mutationObserverConfig);

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