import QrCodeWithLogo from 'qrcode-with-logos'

export async function createQR(
  longLink: string,
  shortLink: string,
): Promise<HTMLImageElement | undefined> {
  const corsProxy = 'https://corsproxy.io/?url='// CORS proxy to fetch the favicon
  const faviconUrl = `https://icons.duckduckgo.com/ip3/${new URL(longLink).hostname}.ico`

  const response = await fetch(`${corsProxy}${encodeURIComponent(faviconUrl)}`)
  const blob = await response.blob()
  const dataUrl = await blobToDataURL(blob)

  const QRCode = document.createElement('img')

  const qrcode = new QrCodeWithLogo({
    image: QRCode,
    content: shortLink,
    width: 380,
    logo: {
      src: dataUrl,
    },
  })

  return await qrcode.getImage()
}

function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}
