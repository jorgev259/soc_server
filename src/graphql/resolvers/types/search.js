const resolvers = {
  VgmResult: {
    vgmdbUrl: parent => parent.vgmdb_url,
    releaseDate: parent => parent.release_date?.replaceAll('.', '-'),
    categories: parent => parent.category?.split(',').map(i => i.trim()),
    classifications: parent => parent.classification?.split(',').map(i => i.trim())
  }
}

export default resolvers
