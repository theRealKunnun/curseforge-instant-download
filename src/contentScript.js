let handleWidgetAppearance = () => {
    let fileId;
    const card = document.querySelector("#__next > main > div.container.project-page > div.modal-container > section > div.modal-content > div.download-details.is-latest > a");
    if (card) {
        const link = card.getAttribute("href").split("/");
        fileId = link[link.length - 1];
        console.debug(`file id found: ${fileId}`);
    }

    const widgetDownloadButton = document.querySelector("#__next > main > div.container.project-page > div.modal-container > section > div.actions > button");
    if (widgetDownloadButton + fileId) {
        console.debug(`widget download button found: ${widgetDownloadButton.textContent.trim()}`);
        widgetDownloadButton.addEventListener('click', function () {
            const modpageUrl = window.location.href;
            console.debug(`widget download button clicked`);
            chrome.storage.session.get(["idfc_modId"]).then((result) => {
                console.debug(`mod id retrieved from storage: ${result.idfc_modId}`);
                (async () => {
                    const response = await chrome.runtime.sendMessage({reason: "download", data: { url: `https://www.curseforge.com/api/v1/mods/${result.idfc_modId}/files/${fileId}/download`}});
                    (response === "download started") ? window.location.href = modpageUrl : undefined;
                })();
            });
        });
        mutationObserver.disconnect();
    }
};

const modId = document.querySelector("#__next > main > div.container.project-page > aside > div.aside-box.project-details-box > section:nth-child(2) > dl > dd:nth-child(6)").textContent.trim()
if (modId) {
    chrome.storage.session.set({idfc_modId: modId}).then(() => {
        console.debug(`mod id was stored: ${modId}`);
    });
}

const widgetDownloadButtonParentElement = document.querySelector("#__next > main > div.container.project-page");
if (widgetDownloadButtonParentElement) {
    console.debug("widgetDownloadButtonParentElement found");
}
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


// chrome.storage.session.set({ key: value }).then(() => {
//     console.log("Value was set");
// });
//
// chrome.storage.session.get(["key"]).then((result) => {
//     console.log("Value is " + result.key);
// });


//
//
// const handleModalAdded = () => {
//     // Select the modal element
//     //document.querySelector("#__next > main > div.container.project-page > div.modal-container > section > div.actions > button")
//
//     const modalButton = document.querySelector("#__next > main > div.container.project-page > div.modal-container > section > div.actions > button");
//
//     // Check if the modal element exists
//     if (modalButton) {
//         // Do something with the modal, e.g., access its contents or manipulate it
//         console.debug('Modal found');
//         console.debug(modalButton.textContent.trim())
//         modalButton.addEventListener('click', function() {
//             console.debug('HEYYYYYYYYYY');
//             window.location.href = 'https://example.com';
//         });
//
//         // Disconnect the observer since we found the modal
//         observer.disconnect();
//     }
// };
//
//
// let targetNode = document.querySelector("#__next > main > div.container.project-page")
//
// // Options for the observer (which mutations to observe)
// let config = { childList: true, subtree: true };
//
// // Callback function to execute when mutations are observed
// let callback = function(mutationsList, observer) {
//     for(let mutation of mutationsList) {
//         if (mutation.type === 'childList') {
//             console.debug('A child node has been added or removed.');
//             handleModalAdded();
//         }
//     }
// };
//
// // Create an observer instance linked to the callback function
// let observer = new MutationObserver(callback);
//
// // Start observing the target node for configured mutations
// observer.observe(targetNode, config);
//
// // Later, you can disconnect the observer
// // observer.disconnect();

// function getModId() {
//     let modIdContainer = document.querySelector('div.aside-box.project-details-box > section:nth-child(2) > dl:nth-child(2) > dd:nth-child(6)');
//     let modId = undefined;
//     if (modIdContainer) {
//         modId = modIdContainer.textContent.trim();
//         // chrome.storage.session.get(["modId"]).then((result) => {
//         //     if (result.modId !== modId) {
//         //         (async () => {
//         //             const response = await chrome.runtime.sendMessage({greeting: modId});
//         //         })();
//         //     }
//         // });
//         // (async () => {
//         //     const response = await chrome.runtime.sendMessage({greeting: modId});
//         // })();
//     }
//     return modId;
// }
//
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message === "active tab changed") {
//         console.debug(message)
//         sendResponse(getModId())
//     } else if (message === "go back") {
//         this.window.history.back();
//     }
// })
//
//
// //1.1 check if page has mod id in it, if so; send message to service worker with mod id itself [X]
// // chrome.runtime.onMessage.addListener(
// //     async function(request, sender, sendResponse) {
// //         if (request.greeting === "retrieve"){
// //             await sendResponse({farewell: "goodbye"});
// //         }
// //     }
// // );
//
// // chrome.runtime.onMessage.addListener(
// //     function(request, sender, sendResponse) {
// //         console.log(sender.tab ?
// //             "from a content script:" + sender.tab.url :
// //             "from the extension");
// //         if (request.greeting === "hello")
// //             sendResponse({farewell: "goodbye"});
// //     }
// // );
//
// // chrome.runtime.onMessage.addListener(
// //     function (request, sender, sendResponse) {
// //         if (request.greeting === "active tab changed") {
// //             sendResponse({farewell: "request to retrieve mod id received"});
// //             console.debug("request to retrieve mod id received");
// //         }
// //     }
// // );
//
// // chrome.runtime.onMessage.addListener(async function (request, sender) {
// //     let message = await request.greeting
// //     if (message === "retrieve-mod-id"){
// //         console.log("retrieval request received")
// //     }
// //
// //     // chrome.storage.session.set({modId: request.greeting})
// //     // console.log(request.greeting)
// //
// //     // console.log(`sender tab: ${sender.tab.id}`)
// //     // console.log(`current tab: ${sender.tab.id}`)
// // });
