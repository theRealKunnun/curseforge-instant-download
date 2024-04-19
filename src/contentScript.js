let handleWidgetAppearance = () => {
    let fileId;
    const card = document.querySelector("#__next > main > div.container.project-page > div.modal-container > section > div.modal-content > div.download-details.is-latest > a");
    if (card) {
        const link = card.getAttribute("href").split("/");
        fileId = link[link.length - 1];
    }
    const widgetDownloadButton = document.querySelector("#__next > main > div.container.project-page > div.modal-container > section > div.actions > button");
    if (widgetDownloadButton + fileId) {
        widgetDownloadButton.addEventListener('click', function () {
            const modpageUrl = window.location.href;
            chrome.storage.session.get(["idfc_modId"]).then((result) => {
                (async () => {
                    const response = await chrome.runtime.sendMessage({reason: "download", data: { url: `https://www.curseforge.com/api/v1/mods/${result.idfc_modId}/files/${fileId}/download`}});
                    (response === "download started") ? window.location.href = modpageUrl : undefined;
                })();
            });
        });
        mutationObserver.disconnect();
    }
};

function getModId() {
    let modId = document.querySelector("#__next > main > div.container.project-page > aside > div.aside-box.project-details-box > section:nth-child(2) > dl > dd:nth-child(6)");
    if (modId) {
        modId = modId.textContent.trim();
    }
    return modId;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.reason === "activeTabChanged") {
        let modId = getModId();
        (modId) ? sendResponse(modId) : sendResponse("noModIdFound")
    }
})

let modId = getModId();
(modId) ? chrome.storage.session.set({idfc_modId: modId}) : undefined;
const widgetDownloadButtonParentElement = document.querySelector("#__next > main > div.container.project-page");
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
//mutationObserver.disconnect();