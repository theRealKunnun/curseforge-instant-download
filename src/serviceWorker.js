function generateRandomId() {
    return new Promise(function (resolve) {
        const number = Math.floor(Math.random() * (10000000 - 1 + 1)) + 1;
        resolve(number);
    })
}

chrome.storage.session.setAccessLevel({accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.reason === "download") {
        chrome.downloads.download(
            {url: message.data.url}
        );
        sendResponse("download started");
    }
});

chrome.tabs.onActivated.addListener(async function (activeInfo) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {reason: "activeTabChanged"});
    if (response !== "noModIdFound") {
        await chrome.declarativeNetRequest.updateSessionRules({
            addRules: [{
                "id": await generateRandomId(), "priority": 1, "action": {
                    "type": "redirect",
                    "redirect": {"regexSubstitution": `https://www.curseforge.com/api/v1/mods/${response}/files/\\4/download`}
                }, "condition": {
                    "regexFilter": "^https:\\/\\/www\\.curseforge\\.com\\/([^\\/]+)\\/([^\\/]+)\\/([^\\/]+)\\/download\\/([^\\/]+)$",
                    "resourceTypes": ["main_frame"]
                }
            }]
        });
    }
})