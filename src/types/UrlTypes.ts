export type urlResponse = {
  data?: urlData
  error?: urlError
  ok: boolean
}
export type urlData = {
  shortLink: string
  longLink: string
}
export type urlError = {
  code: number
  errors: string[]
}
