export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timeout: ReturnType<typeof setTimeout>
  return function (...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  } as T
}

export function updateChromeExtension(links: unknown[]) {
  const extensionId = 'dffhkpjammkicoldkcfkhmjpjhkoojlm'

  if (window.chrome?.runtime?.sendMessage) {
    window.chrome.runtime.sendMessage(
      extensionId,
      { type: 'save-links', links },
      undefined,
      (response) => {
        console.log('Response from extension:', response)
      },
    )
  }
}
