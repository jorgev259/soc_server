import axios from 'axios'

const artistFields = ['composers', 'lyricists', 'arrangers', 'vocals', 'performers']

const isValidUrl = s => {
  try {
    const testUrl = new URL(s)
    return !!testUrl
  } catch (err) {
    return false
  }
}

export default async function getVGMDB (search) {
  const linkId = isValidUrl(search) ? (new URL(search)).pathname.split('/').slice(-1)[0] : search
  let data = null

  try {
    const { data: apiData } = await axios.get(`https://vgmdb.info/album/${linkId}`, { headers: { 'Content-Type': 'application/json' } })
    data = apiData
    const { name, names = [], discs = [] } = data

    data.subTitle = Object.values(names).find(n => n !== name)

    const artists = new Set()
    artistFields.forEach(field => {
      const list = data[field] ?? []
      list.forEach(a => artists.add(Object.values(a.names)[0]))
    })

    data.artists = Array.from(artists)
    data.tracklist = discs.map((disc, index) => {
      const { tracks = [] } = disc
      const body = tracks.map(t => Object.values(t.names)[0]).join('\n')

      return { number: index, body }
    })

    return data
  } catch (err) {
    return data
  }
}
