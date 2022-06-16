import { get } from 'axios'
import cheerio from 'cheerio'

const isValidUrl = s => {
  try {
    const testUrl = new URL(s)
    return !!testUrl
  } catch (err) {
    return false
  }
}

async function makeRequest (url) {
  try {
    const { data } = await get(
      `https://api.nemoralni.site/albums/${url}`,
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'x-api-key': 'i-m-a-pig-i-don-t-fight-for-honor-i-fight-for-a-paycheck' } })

    return data
  } catch {

  }
}

export default async function getVGMDB (search) {
  const url = isValidUrl(search) ? (new URL(search)).pathname.split('/').slice(-1) : search

  const data = await makeRequest(url)
  if (!data) return {}

  const { vgmdb_url: vgmdbUrl } = data
  data.tracklist = []
  const { data: htmlBody } = await get(vgmdbUrl, { headers: { 'Content-Type': 'text/html' } })

  const $ = cheerio.load(htmlBody)

  const discs = $('#tracklist table')
  discs.each((i, d) => {
    if (d.parent.attribs.style?.includes('display: none')) return true

    let list = ''
    const tbody = d.childNodes.find(n => n.type === 'tag')
    const trows = tbody.childNodes.filter(n => n.type === 'tag' && n.name === 'tr')

    trows.forEach((tRow, i2) => {
      if (i2 > 0) list = `${list}\n`
      const tds = tRow.childNodes.filter(n => n.type === 'tag' && n.name === 'td')
      const td = tds[1].childNodes[0].data.trim()

      list = `${list}${td}`
    })
    data.tracklist.push({ number: i, body: list })
  })

  data.subTitle = $('div > span.albumtitle[style="display:inline"]')[0]?.childNodes.find(n => n.type === 'text')?.data

  return data
}
