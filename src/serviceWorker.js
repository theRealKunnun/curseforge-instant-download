//content script
//go with service worker -> manual

function generateRandomId() {
    return new Promise(function (resolve) {
        const number = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
        resolve(number);
    })
}
function getFileIdFromUrl(url) {
    return new Promise(function (resolve) {
        const parts = url.split('/');
        resolve(parts[parts.length - 1])
    })
}

//https://www.curseforge.com/minecraft/mc-mods/yungs-better-ocean-monuments/download/5124323
//https://www.curseforge.com/api/v1/mods/689238/files/5124323/download
chrome.tabs.onActivated.addListener(async function (activeInfo) {



    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const modId = await chrome.tabs.sendMessage(tab.id, "active tab changed");
    console.debug(modId)

    //create new custom redirect rule
    await chrome.declarativeNetRequest.updateSessionRules({
        addRules: [{
            "id": await generateRandomId(), "priority": 1, "action": {
                "type": "redirect",
                "redirect": {"regexSubstitution": `https://www.curseforge.com/api/v1/mods/${modId}/files/\\4/download`}
            }, "condition": {
                "regexFilter": "^https:\\/\\/www\\.curseforge\\.com\\/([^\\/]+)\\/([^\\/]+)\\/([^\\/]+)\\/download\\/([^\\/]+)$",
                "resourceTypes": ["main_frame"]
            }
        }]
    });
    //https://www.curseforge.com/_next/data/qcfOenDtpgFbDf2z54Dsc/en/minecraft/mc-mods/industrial-foregoing/download/5240372.json?slug=minecraft&classSlug=mc-mods&projectSlug=industrial-foregoing&fileId=5240372
    //https://www.curseforge.com/minecraft/mc-mods/industrial-foregoing/download/5240372
    // chrome.webRequest.onResponseStarted.addListener(function (details) {
    //     const params = new URLSearchParams(new URL(details.url).search);
    //     const fileId = params.get('fileId');
    //
    //     chrome.downloads.search(
    //         {},
    //         function (results){
    //             console.log(results)
    //         }
    //     )
    //
    //
    //     //let count = await chrome.storage.session.get('count');
    //     // chrome.storage.session.get(["count"]).then((result) => {
    //     //     if (result.count === 0) {
    //     //         console.debug("good")
    //     //         chrome.downloads.download({url: `https://www.curseforge.com/api/v1/mods/${modId}/files/${fileId}/download`}, function () {
    //     //             console.log("downloading")
    //     //         })
    //     //         chrome.storage.session.set({count: 1})
    //     //     } else {
    //     //         console.debug("bad")
    //     //     }
    //     // });
    //
    //     // chrome.storage.session.get(["count"]).then((result) => {
    //     //     if (result.modId !== modId) {
    //     //         (async () => {
    //     //             const response = await chrome.runtime.sendMessage({greeting: modId});
    //     //         })();
    //     //     }
    //     // });
    //
    //     // if (count === 0) {
    //     //     chrome.downloads.download({url: `https://www.curseforge.com/api/v1/mods/${modId}/files/${fileId}/download`}, function () {
    //     //         count += 1
    //     //     })
    //     // }
    //
    //     // chrome.tabs.update({url: `https://www.curseforge.com/api/v1/mods/${modId}/files/${fileId}/download`}, async function () {
    //     //     chrome.webRequest.onCompleted.addListener(async function () {
    //     //         await chrome.tabs.sendMessage(tab.id, "go back");
    //     //     }, {urls: ["https://www.curseforge.com/_next/data/*"]})
    //     // })
    // }, {urls: ["https://www.curseforge.com/*/*/*/download/*"]})
    // chrome.webRequest.onBeforeRequest.addListener(async function () {
    //     //maybe put in tab id from 'tab', because updateProperties has a 'tabId' sub-property
    //     const [adTab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    //     console.debug(adTab.url);
    //
    //     //https://www.curseforge.com/api/v1/mods/266515/files/dependencies/download
    //     // chrome.tabs.update({url: `https://www.curseforge.com/api/v1/mods/${response}/files/${await getFileIdFromUrl(adTab.url)}/download`}, function (tab) {
    //     //
    //     // })
    // }, {
    //     urls: ["https://www.curseforge.com/*/*/*/download/*"]
    // })
    // if (await adDownload(tab.url) === true){
    //     console.debug("adDownload")
    // } else {
    //     console.debug("NOT adDownload")
    // }
})
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

