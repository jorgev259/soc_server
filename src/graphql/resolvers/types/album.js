import GraphQLUpload from 'graphql-upload/public/GraphQLUpload.js'

import { headerColor, placeholder } from '../../../utils/resolvers'

const resolvers = {
  Upload: GraphQLUpload,
  Album: {
    artists: (parent, args, context, info) => parent.getArtists(),
    classes: (parent, args, context, info) => parent.getClasses(),
    categories: (parent, args, context, info) => parent.getCategories(),
    platforms: (parent, args, context, info) => parent.getPlatforms({ order: ['name'] }),
    games: (parent, args, context, info) => parent.getGames(),
    discs: (parent, args, context, info) => parent.getDiscs({ order: [['number', 'ASC']] }),
    related: (parent, args, context, info) => parent.getRelated(),
    stores: (parent) => parent.getStores(),
    animations: (parent) => parent.getAnimations(),
    comments: parent => parent.getComments(),
    isFavorite: async (album, _, { db, user }) => user ? album.hasUser(user.username) : false,
    selfComment: (album, _, { db, user }) => user ? db.models.comment.findOne({ where: { ostId: album.id, username: user.username } }) : null,
    favorites: (album, _, { db }) => album.countUsers(),
    placeholder: (album, _, { db }) => placeholder(album, 'album'),
    headerColor: (album, _, { db }) => headerColor(album, 'album')
  },

  Comment: {
    username: parent => parent.anon ? null : parent.username,
    album: (comment, _, { db }) => comment.getOst()
  },

  Category: {
    albums: parent => parent.getOsts()
  },

  Class: {
    albums: parent => parent.getOsts(),
    count: (parent, args, { db }) => db.models.ost.count({ include: [{ model: db.models.class, where: { name: parent.name } }] })
  },

  Download: {
    links: async download => {
      const links = await download.getLinks()
      const filterLinks = links.filter(link => !link.url.includes('adshrink.it'))

      return filterLinks.length === 0 ? links : filterLinks
    }
  },

  Link: {
    url: async link => {
      const download = await link.getDownload()
      const links = await download.getLinks()

      return links.every(link => link.url.includes('adshrink.it')) ? link.directUrl : link.url
    },

    directUrl: async (link, args, context) => {
      const download = await link.getDownload()
      const links = await download.getLinks()

      const fallback = links.every(link => link.url.includes('adshrink.it'))
      if (fallback) return

      const { user } = context
      if (!user) return false

      const roles = await user.getRoles()
      const perms = roles.map(r => r.permissions).flat()

      const donator = perms.includes('DIRECT')
      if (!donator) return false

      return link.directUrl
    }
  },

  Game: {
    albums: async (game, { order = [] }) => game.getOsts({ order }),
    series: (parent, args, context, info) => parent.getSeries(),
    publishers: (parent, args, context, info) => parent.getPublishers(),
    platforms: (parent, args, context, info) => parent.getPlatforms({ order: ['name'] }),
    placeholder: (game, _, { db }) => placeholder(game, 'game'),
    headerColor: (game, _, { db }) => headerColor(game, 'game')
  },

  Platform: {
    albums: parent => parent.getOsts(),
    games: (platform, args, { db }) => platform.getGames()
  },

  Animation: {
    studios: parent => parent.getStudios(),
    albums: parent => parent.getOsts(),
    placeholder: (anim, _, { db }) => placeholder(anim, 'anim'),
    headerColor: (anim, _, { db }) => placeholder(anim, 'anim')
  },

  Studio: {
    animations: studio => studio.getAnimations()
  },

  Series: {
    games: (parent, args, context, info) => parent.getGames(),
    placeholder: (series, _, { db }) => placeholder(series, 'series'),
    headerColor: (series, _, { db }) => placeholder(series, 'series')
  },

  Publisher: {
    games: (parent, args, context, info) => parent.getGames()
  },

  Disc: {
    album: (parent) => parent.getOst()
  }
}

export default resolvers
