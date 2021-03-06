import { categories, classifications } from '../../../config/info.json'

const resolvers = {
  VgmResult: {
    vgmdbUrl: parent => parent.vgmdb_url,
    releaseDate: parent => parent.release_date?.replaceAll('.', '-'),
    categories: parent => parent.category?.split(',').map(i => i.trim()).filter(c => categories.includes(c)),
    classifications: parent => parent.classification?.split(',').map(i => i.trim()).filter(c => classifications.includes(c))
  }
}

export default resolvers
