// async function generateRandomId() {
//     return Math.floor(Math.random() * (10000000 - 1 + 1)) + 1;
// }
//
// // Each time a tab activates:
// chrome.tabs.onActivated.addListener(async () => {
//     try {
//         // Get the active tab.
//         const [activeTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//
//         // If active tab's url matches for the content script's match pattern, send a message to active tab's content script to get the mod id from the current page content.
//         if (activeTab.url) {
//             const activeTabUrl = new URL(activeTab.url);
//             if (activeTabUrl.origin === 'https://curseforge.com' || activeTabUrl.origin.endsWith('.curseforge.com')) {
//                 const response = await chrome.tabs.sendMessage(activeTab.id, "getModIdFromPageContent()");
//                 if (response) {
//                     await chrome.declarativeNetRequest.updateSessionRules({
//                         addRules: [{
//                             "id": await generateRandomId(),
//                             "priority": 1,
//                             "action": {
//                                 "type": "redirect",
//                                 "redirect": { "regexSubstitution": `https://www.curseforge.com/api/v1/mods/${response}/files/\\4/download` }
//                             },
//                             "condition": {
//                                 "regexFilter": "^https:\\/\\/www\\.curseforge\\.com\\/([^\\/]+)\\/([^\\/]+)\\/([^\\/]+)\\/download\\/([^\\/]+)$",
//                                 "resourceTypes": ["main_frame"]
//                             }
//                         }]
//                     });
//                 }
//             }
//         }
//     } catch (error) {
//         console.error(`IDFC Extension ERROR: ${error}`);
//     }
// });
//
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     chrome.downloads.download({url: message});
//     sendResponse("OK");
// });