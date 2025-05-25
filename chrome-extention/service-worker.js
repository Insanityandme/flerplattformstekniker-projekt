chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.type === 'save-links') {
    chrome.storage.local.set({ links: message.links }, () => {
      sendResponse({ status: 'success' });
    });
    console.log(message)
    return true; // needed for async response
  }
});
