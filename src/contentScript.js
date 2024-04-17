function getModId() {
    let modIdContainer = document.querySelector('div.aside-box.project-details-box > section:nth-child(2) > dl:nth-child(2) > dd:nth-child(6)');

    //TODO: make undefined instead of null
    let modId;

    if (modIdContainer) {
        modId = modIdContainer.textContent.trim();
        // chrome.storage.session.get(["modId"]).then((result) => {
        //     if (result.modId !== modId) {
        //         (async () => {
        //             const response = await chrome.runtime.sendMessage({greeting: modId});
        //         })();
        //     }
        // });
        // (async () => {
        //     const response = await chrome.runtime.sendMessage({greeting: modId});
        // })();
    }
    return modId;
}

chrome.runtime.onMessage.addListener(function (message,sender,sendResponse) {
        console.debug(message)
        sendResponse(getModId())
    }
)


//1.1 check if page has mod id in it, if so; send message to service worker with mod id itself [X]
// chrome.runtime.onMessage.addListener(
//     async function(request, sender, sendResponse) {
//         if (request.greeting === "retrieve"){
//             await sendResponse({farewell: "goodbye"});
//         }
//     }
// );

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.greeting === "hello")
//             sendResponse({farewell: "goodbye"});
//     }
// );

// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         if (request.greeting === "active tab changed") {
//             sendResponse({farewell: "request to retrieve mod id received"});
//             console.debug("request to retrieve mod id received");
//         }
//     }
// );

// chrome.runtime.onMessage.addListener(async function (request, sender) {
//     let message = await request.greeting
//     if (message === "retrieve-mod-id"){
//         console.log("retrieval request received")
//     }
//
//     // chrome.storage.session.set({modId: request.greeting})
//     // console.log(request.greeting)
//
//     // console.log(`sender tab: ${sender.tab.id}`)
//     // console.log(`current tab: ${sender.tab.id}`)
// });