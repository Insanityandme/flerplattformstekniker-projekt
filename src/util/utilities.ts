export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timeout: ReturnType<typeof setTimeout>
  return function (...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  } as T
}

export function updateExtension(links: unknown[]) {
  console.log("updateExtension")
  const jsonLinks = JSON.parse(JSON.stringify(links))
  window.postMessage(
    {
      fromPage: true,
      message: { type: 'UPDATE_EXTENSION_DATA', data: jsonLinks },
    },
    '*',
  )
}
