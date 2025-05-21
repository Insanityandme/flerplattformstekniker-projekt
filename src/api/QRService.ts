import type { urlData } from '@/types/UrlTypes'
import QrCodeWithLogo from 'qrcode-with-logos'

export async function createQR(
  url: urlData,
  imgUrl?: string,
): Promise<HTMLImageElement | undefined> {
  try {
    const corsProxy = 'https://corsproxy.io/?url='
    const faviconUrl = `https://icons.duckduckgo.com/ip3/${new URL(url.longLink).hostname}.ico`

    let customImage = ""
    if (imgUrl){
      customImage = corsProxy + encodeURIComponent(imgUrl)
    }

    const response = await fetch(`${corsProxy}${encodeURIComponent(faviconUrl)}`)
    const blob = await response.blob()
    const dataUrl = await _blobToDataURL(blob)

    const QRCode = document.createElement('img')

    const qrcode = new QrCodeWithLogo({
      image: QRCode,
      content: url.shortLink,
      width: 380,
      logo: {
        src: imgUrl ? customImage : dataUrl,
      },
    })

    return await qrcode.getImage()
  } catch (error) {
    console.error('Failed to create QR code:', error)
    return undefined
  }
}

function _blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}
