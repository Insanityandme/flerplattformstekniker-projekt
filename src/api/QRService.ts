import type { urlData } from '@/types/UrlTypes'
import QrCodeWithLogo from 'qrcode-with-logos'

export async function createQR(url: urlData): Promise<HTMLImageElement | undefined> {
  try {
    const corsProxy = 'https://corsproxy.io/?url='
    const faviconUrl = `https://icons.duckduckgo.com/ip3/${new URL(url.longLink).hostname}.ico`

    const response = await fetch(`${corsProxy}${encodeURIComponent(faviconUrl)}`)
    const blob = await response.blob()
    const dataUrl = await _blobToDataURL(blob)

    const QRCode = document.createElement('img')

    const qrcode = new QrCodeWithLogo({
      image: QRCode,
      content: url.shortLink,
      width: 380,
      logo: {
        src: dataUrl,
      },
    })

    return await qrcode.getImage()
  } catch (error) {
    console.error('Failed to create QR code:', error)
    return undefined
  }
}

export async function batchCreateQR(urls: urlData[]): Promise<HTMLImageElement[]> {
  const qrCodes: HTMLImageElement[] = []
  for (const url of urls) {
    const qrcode = await createQR(url)
    if (qrcode) {
      qrCodes.push(qrcode)
    }
  }
  return qrCodes
}

function _blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}
