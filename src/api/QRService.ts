import QrCodeWithLogo from 'qrcode-with-logos'
import type { DotType, CornerType } from 'qrcode-with-logos/types/src/core/types';

let cachedHostname = ''
let cachedFavicon = ''

let cachedImgUrl = ''
let cachedImageData = ''

export async function createQR(
  url?: string,
  imgUrl?: string,
  logoData?: string,
  download?: boolean,
  dotsOptions?: { type?: DotType; color?: string },
  cornersOptions?: { type?: CornerType; color?: string },
): Promise<string | undefined> {
  try {
    const corsProxy = 'https://corsproxy.io/?url='

    let faviconUrl = ''
    let dataUrl = ''
    if (url) {
      const hostname = new URL(url).hostname
      faviconUrl = `https://icons.duckduckgo.com/ip3/${hostname}.ico`

      if (hostname === cachedHostname && cachedFavicon) {
        dataUrl = cachedFavicon
      } else {
        const response = await fetch(`${corsProxy}${encodeURIComponent(faviconUrl)}`)
        const blob = await response.blob()
        dataUrl = await _blobToDataURL(blob)
        cachedHostname = hostname
        cachedFavicon = dataUrl
      }
    }

    let customImage = ''
    if (imgUrl) {
      if (imgUrl === cachedImgUrl && cachedImageData) {
        customImage = cachedImageData
      } else {
        const response = await fetch(`${corsProxy}${encodeURIComponent(imgUrl)}`)
        const blob = await response.blob()
        customImage = await _blobToDataURL(blob)
        cachedImgUrl = imgUrl
        cachedImageData = customImage
      }
    } else if (logoData) {
      customImage = logoData
    }

    const QRCode = document.createElement('img')
    const qrcode = new QrCodeWithLogo({
      image: QRCode,
      download,
      content: url ? url : 'https://www.youtube.com/watch?v=xm3YgoEiEDc',
      width: 380,
      logo: {
        src: customImage ? customImage : dataUrl || '/chuck-norris-placeholder.jpg',
      },
      dotsOptions: dotsOptions,
      cornersOptions: cornersOptions,
    })

    return (await qrcode.getImage()).src
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
