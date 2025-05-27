try {
  browser.runtime.onMessage.addListener((message) => {
    console.log('Background received message:', message)
    if (message.type === 'UPDATE_EXTENSION_DATA') {
      browser.storage.local.set({ links: message.data }).then(() => {
        console.log('Links stored')
      })
    }
  })
} catch (e) {
  console.error(e)
}
