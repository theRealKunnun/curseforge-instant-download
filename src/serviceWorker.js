function generateRandomId() {
    return new Promise(function (resolve) {
        const number = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
        resolve(number);
    })
}

// function generateRegexSubstitutionString(modId) {
//     return new Promise(function (resolve) {
//         const regexSubstitutionString = `https://www.curseforge.com/api/v1/mods/${modId}/files/\\4/download`
//         resolve(regexSubstitutionString);
//         // chrome.storage.session.get(["modId"]).then((result) => {
//         //     let string = `https://www.curseforge.com/api/v1/mods/${result.modId}/files/\\4/download`
//         //     resolve(string);
//         // });
//     })
// }

//https://www.curseforge.com/minecraft/mc-mods/yungs-better-ocean-monuments/download/5124323
//https://www.curseforge.com/api/v1/mods/689238/files/5124323/download

chrome.tabs.onActivated.addListener(async function (activeInfo) {
    //send "active tab changed"-message to content script
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, "active tab changed");
    console.debug(response)

    //await chrome.storage.session.set({modId: response})

    await chrome.declarativeNetRequest.updateSessionRules({
        addRules: [{
            "id": await generateRandomId(),
            "priority": 1,
            "action": {"type": "redirect", "redirect": {"regexSubstitution": `https://www.curseforge.com/api/v1/mods/${response}/files/\\4/download`}},
            "condition": {
                "regexFilter": "^https:\\/\\/www\\.curseforge\\.com\\/([^\\/]+)\\/([^\\/]+)\\/([^\\/]+)\\/download\\/([^\\/]+)$",
                "resourceTypes": ["main_frame"]
            }
        }]
    });
})


// function tabIsDownloadPage(url) {
//     const regex = /^https:\/\/www\.curseforge\.com\/[^\/]+\/[^\/]+\/[^\/]+\/download\/[^\/]+$/;
//     return regex.test(url);
// }


// chrome.runtime.onMessage.addListener(function (request, sender) {
//     chrome.storage.session.set({modId: request.greeting})
//     console.log(request.greeting)
//
//     // console.log(`sender tab: ${sender.tab.id}`)
//     // console.log(`current tab: ${sender.tab.id}`)
// });

// chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo) {
//     if (tabIsDownloadPage(changeInfo.url) === true) {
//         //console.log("download page detected")
//         //works, but does not update rules retroactively
//         const newRules = await getNewRules();
//         await chrome.declarativeNetRequest.updateSessionRules({
//             addRules: newRules
//         });
//     }
// })
//


// // Get arrays containing new and old rules
// const newRules = await getNewRules();
// const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
// const oldRuleIds = oldRules.map(rule => rule.id);
//
// // Use the arrays to update the dynamic rules
// await chrome.declarativeNetRequest.updateDynamicRules({
//     removeRuleIds: oldRuleIds,
//     addRules: newRules
// });


// chrome.tabs.onUpdated.addListener(
//     function () {
//         chrome.tabs.query({}, (tabs) => {
//             let tabUrl = tabs[0].url;
//             if (tabIsDownloadPage(tabUrl) === true) {
//                 chrome.storage.session.get(["modId"]).then((result) => {
//                     if (result.modId){
//                         chrome.tabs.update(
//                             {url: `https://www.curseforge.com/api/v1/mods/${result.modId}/files/${getFileIdFromUrl(tabUrl)}/download`}
//                         )
//                     }
//
//                     console.log(`mod id: ${result.modId}`);
//                     console.log(`file id ${getFileIdFromUrl(tabUrl)}`);
//
//                 });
//             }
//         });
//     }
// )

// chrome.webRequest.onResponseStarted.addListener(
//     function (details){
//         (async () => {
//             const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//             const response = await chrome.tabs.sendMessage(tab.id, {greeting: "triggerModIdDetection"});
//         })();
//     }, {
//         urls: ["https://www.curseforge.com/*/*/*"]
//     }
// )

// function getFileIdFromUrl(url) {
//     const parts = url.split('/');
//     return parts[parts.length - 1];
// }