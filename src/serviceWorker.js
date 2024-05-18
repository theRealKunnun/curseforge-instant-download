function generateRandomId() {
    return new Promise(function (resolve) {
        const number = Math.floor(Math.random() * (10000000 - 1 + 1)) + 1;
        resolve(number);
    })
}

chrome.tabs.onActivated.addListener(async function () {
    //get the current tab
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    //send msg to contentScript to retrieve modId
    const response = await chrome.tabs.sendMessage(tab.id, {reason: "activeTabChanged"});
    //if a modId has been found
    if (response !== "noModIdFound") {
        console.debug("service Worker received response from content script, from message with reason 'active tab changed' plus MOD ID HAS BEEN FOUND" + response);
        //create redirect for instant download
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