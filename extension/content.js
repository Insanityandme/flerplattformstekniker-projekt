const runtime = (typeof browser !== 'undefined') ? browser.runtime : chrome.runtime;

window.addEventListener('message', (event) => {
  if (event.source !== window) return
  if (!event.data.fromPage) return

  if (event.data.message?.type === 'UPDATE_EXTENSION_DATA') {
    console.log('Content script received:', event.data.message.data)

    runtime.sendMessage({
      type: 'UPDATE_EXTENSION_DATA',
      data: event.data.message.data,
    })
  }
})
