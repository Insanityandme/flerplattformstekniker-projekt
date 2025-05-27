chrome.runtime.onMessage.addListener((message) => {
  console.log(message)
  if (message.type === 'UPDATE_EXTENSION_DATA') {
    chrome.storage.local.set({ links: message.data }, () => {
      console.log('Links stored');
    });
  }
});
