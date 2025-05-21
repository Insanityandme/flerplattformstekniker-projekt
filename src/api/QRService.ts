import QrCodeWithLogo from 'qrcode-with-logos'

export async function createQR(url: string, imgUrl?: string): Promise<string | undefined> {
  try {
    const corsProxy = 'https://corsproxy.io/?url='
    const faviconUrl = `https://icons.duckduckgo.com/ip3/${new URL(url).hostname}.ico`

    let customImage = ''
    if (imgUrl) {
      customImage = corsProxy + encodeURIComponent(imgUrl)
    }

    const response = await fetch(`${corsProxy}${encodeURIComponent(faviconUrl)}`)
    const blob = await response.blob()
    const dataUrl = await _blobToDataURL(blob)

    const QRCode = document.createElement('img')

    const qrcode = new QrCodeWithLogo({
      image: QRCode,
      content: url,
      width: 380,
      logo: {
        src: imgUrl ? customImage : dataUrl,
      },
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
