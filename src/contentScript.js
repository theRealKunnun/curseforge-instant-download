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
