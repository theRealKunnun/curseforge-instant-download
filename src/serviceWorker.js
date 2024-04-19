chrome.storage.session.setAccessLevel({accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"}, function () {
    console.debug("storage access level changed")
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //{reason: "download", data: { url: `https://www.curseforge.com/api/v1/mods/${result.idfc_modId}/files/${fileId}/download`}}
    if (message.reason === "download") {
        chrome.downloads.download(
            {url: message.data.url},
            function (downloadId) {
                console.debug(`downloaded: ${message.data.url}`);
            }
        )
        sendResponse("download started")
    }
})

// // tabs
// chrome.tabs.onActivated.addListener(function (activeInfo) {
//     console.debug('onActivated');
//     console.debug(activeInfo);
// })
//
// chrome.tabs.onHighlighted.addListener(function (highlightInfo) {
//     console.debug('onHighlighted');
//     console.debug(highlightInfo);
// })
//
// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     console.debug('onUpdated');
//     console.debug(tabId);
//     console.debug(changeInfo);
//     console.debug(tab);
// })

// webRequest
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    console.debug('onBeforeRequest');
    console.debug(details);
}, {urls: ['https://*.curseforge.com/*']})

// await chrome.declarativeNetRequest.updateSessionRules({
//     addRules: [{
//         "id": await generateRandomId(), "priority": 1, "action": {
//             "type": "redirect",
//             "redirect": {"regexSubstitution": `https://www.curseforge.com/api/v1/mods/${modId}/files/\\4/download`}
//         }, "condition": {
//             "regexFilter": "^https:\\/\\/www\\.curseforge\\.com\\/([^\\/]+)\\/([^\\/]+)\\/([^\\/]+)\\/download\\/([^\\/]+)$",
//             "resourceTypes": ["main_frame"]
//         }
//     }]
// });

//, {
//             "id": await generateRandomId(), "priority": 1, "action": {
//                 "type": "redirect",
//                 "redirect": {"regexSubstitution": `https://www.curseforge.com/api/v1/mods/${response}/files/\\1/download`}
//             }, "condition": {
//                 "regexFilter": "^https:\\/\\/www\\.curseforge\\.com\\/\\_next\\/data\\/.+\\=([\\d]+)$",
//                 "resourceTypes": ["main_frame"]
//             }
//         }, {
//             "id": await generateRandomId(), "priority": 1, "action": {
//                 "type": "redirect",
//                 "redirect": {"regexSubstitution": `https://www.curseforge.com/api/v1/mods/${response}/files/888/download`}
//             }, "condition": {
//                 "regexFilter": "^https:\\/\\/static-beta\\.curseforge\\.com\\/_next\\/static\\/chunks\\/pages\\/[\\D|\\d]+$",
//                 "resourceTypes": ["main_frame"]
//             }
//         }

// chrome.webRequest.onBeforeRedirect.addListener(function (details) {
//     console.debug('onBeforeRedirect');
//     console.debug(details);
// }, {urls: ['https://*.curseforge.com/*']})