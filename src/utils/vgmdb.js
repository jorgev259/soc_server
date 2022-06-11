import { get } from 'axios'

const isValidUrl = s => {
  try {
    const testUrl = new URL(s)
    return !!testUrl
  } catch (err) {
    return false
  }
}

export default async function getVGMDB (search) {
  const url = isValidUrl(search) ? (new URL(search)).pathname.split('/').slice(-1) : search

  try {
    const response = await get(
      `https://api.nemoralni.site/albums/${url}`,
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'x-api-key': 'i-m-a-pig-i-don-t-fight-for-honor-i-fight-for-a-paycheck' } })
    return response.data
  } catch {}
}
