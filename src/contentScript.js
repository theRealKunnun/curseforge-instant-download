

let modId = document.querySelector("#__next > main > div.container.project-page > aside > div.aside-box.project-details-box > section:nth-child(2) > dl > dd:nth-child(6)");
if (modId) {
    console.debug(modId.textContent.trim());
}


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
