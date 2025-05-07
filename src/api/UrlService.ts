import type { urlResponse } from '@/types/UrlTypes'

export async function createShortUrl(
  longLink: string,
  linkSuffix?: string,
): Promise<urlResponse> {
  const url = 'https://api.tinyurl.com/create'
  const token = import.meta.env.VITE_TINYURL_TOKEN

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url: longLink,
        alias: linkSuffix || undefined,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Failed to generate short url')
      return {
        error: {
          code: data.code,
          errors: data.errors,
        },
        ok: false,
      }
    }
    return {
      data: {
        shortLink: data.data.tiny_url,
        longLink: longLink,
      },
      ok: true,
    }
  } catch (error) {
    console.error(error)
    return {
      error: {
        code: -1,
        errors: ['Something went wrong'],
      },
      ok: false,
    }
  }
}
