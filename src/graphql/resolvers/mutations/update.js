import { composeResolvers } from '@graphql-tools/resolvers-composition'

import { img, createLog, createUpdateLog, getImgColor, slugify } from '../../../utils'
import { postReddit, postDiscord } from '../../../utils/plugins'

import { hasRole } from '../../../utils/resolvers'

const resolversComposition = { 'Mutation.*': hasRole('UPDATE') }
const resolvers = {
  Mutation: {
    createPublisher: async (parent, data, { db, user }, info) => (
      db.transaction(async () => {
        const pub = await db.models.publisher.create(data)
        data.id = pub.id
        await createLog(db, 'createPublisher', data, user.username)

        return pub
      })
    ),
    updatePublisher: async (parent, { id, name }, { user, db }, info) => (
      db.transaction(async () => {
        const pub = await db.models.publisher.findByPk(id)
        pub.name = name

        await pub.save()
        await createUpdateLog(db, 'updatePublisher', pub, user.username)
        return pub
      })
    ),
    deletePublisher: async (parent, { id }, { user, db }) => (
      db.transaction(async () => {
        const pub = await db.models.publisher.findByPk(id)
        await createLog(db, 'deletePublisher', pub.dataValues, user.username)
        await pub.destroy()
      })
    ),

    createPlatform: async (parent, data, { db, user }, info) => (
      db.transaction(async () => {
        const plat = db.models.platform.create(data)
        data.id = plat.id
        await createLog(db, 'createPlatform', data, user.username)
        return plat
      })
    ),
    updatePlatform: async (parent, { key, name, type }, { user, db }, info) => (
      db.transaction(async () => {
        const plat = await db.models.platform.findByPk(key)
        if (name) plat.name = name
        if (type !== plat.type) plat.type = type

        await plat.save()
        await createUpdateLog(db, 'updatePlatform', plat, user.username)
        return plat
      })
    ),
    deletePlatform: async (parent, { key }, { user, db }) => (
      db.transaction(async () => {
        const plat = await db.models.platform.findByPk(key)
        await createLog(db, 'deletePlatform', plat.dataValues, user.username)
        plat.destroy()
      })
    ),

    createStudio: async (parent, data, { db, user }, info) => (
      db.transaction(async () => {
        const studio = db.models.studio.create(data)
        data.slug = studio.slug
        await createLog(db, 'createStudio', data, user.username)
        return studio
      })
    ),
    updateStudio: async (parent, { slug, name }, { user, db }, info) => (
      db.transaction(async () => {
        const studio = await db.models.studio.findByPk(slug)
        studio.name = name

        await studio.save()
        await createUpdateLog(db, 'updateStudio', studio, user.username)
        return studio
      })
    ),
    deleteStudio: async (parent, { slug, name }, { user, db }, info) => (
      db.transaction(async () => {
        const studio = await db.models.studio.findByPk(slug)
        await createLog(db, 'deleteStudio', studio.dataValues, user.username)
        studio.destroy()
      })
    ),

    createSeries: async (parent, data, { db, user }, info) => (
      db.transaction(async transaction => {
        const series = await db.models.series.create(data, { transaction })
        const { slug } = series.dataValues

        series.placeholder = data.cover ? await img(data.cover, 'series', slug) : undefined
        series.headerColor = data.cover ? await getImgColor(`series/${slug}`) : undefined
        await series.save({ transaction })

        await createLog(db, 'createSeries', data, user.username, transaction)
        return series
      })
    ),
    updateSeries: async (parent, { slug, name, cover }, { user, db }, info) => (
      db.transaction(async () => {
        const series = await db.models.series.findByPk(slug)
        if (name) series.name = name
        if (cover) {
          series.placeholder = await img(cover, 'series', slug)
          series.headerColor = await getImgColor(`series/${slug}`)
        }

        await series.save()
        await createUpdateLog(db, 'updateSeries', series, user.username)
        return series
      })
    ),
    deleteSeries: async (parent, { slug }, { user, db }) => (
      db.transaction(async () => {
        const series = await db.models.series.findByPk(slug)
        await createLog(db, 'deleteSeries', series.dataValues, user.username)
        await series.destroy()
      })
    ),

    createGame: async (parent, data, { db, user }, info) => {
      return db.transaction(async () => {
        const game = await db.models.game.create(data)

        await Promise.all([
          game.setSeries(data.series),
          game.setPublishers(data.publishers),
          game.setPlatforms(data.platforms)
        ])

        game.placeholder = data.cover ? await img(data.cover, 'game', data.slug) : ''
        game.headerColor = data.cover ? await getImgColor(`game/${data.slug}`) : undefined

        await game.save()
        await createLog(db, 'createGame', data, user.username)
        return game
      })
    },
    updateGame: async (parent, args, { user, db }, info) => {
      return db.transaction(async () => {
        const { slug, name, cover, releaseDate, series = [], publishers, platforms } = args
        const game = await db.models.game.findByPk(slug)

        game.name = name
        game.releaseDate = releaseDate
        game.setSeries(series)
        game.setPublishers(publishers)
        game.setPlatforms(platforms)

        if (cover) {
          game.placeholder = await img(cover, 'game', slug)
          series.headerColor = await getImgColor(`game/${slug}`)
        }

        // make more comprehensible log

        await game.save()
        await createUpdateLog(db, 'updateGame', game, user.username)
        return game
      })
    },
    deleteGame: async (parent, { slug }, { user, db }) => {
      db.transaction(async () => {
        const game = await db.models.game.findByPk(slug)
        const log = {
          ...game.dataValues,
          series: await game.getSeries(),
          publishers: await game.getPublishers(),
          platforms: await game.getPlatforms()
        }

        await createLog(db, 'deleteSeries', log, user.username)
        await game.destroy()
      })
    },

    createAnimation: async (parent, data, { db, user }, info) => {
      return db.transaction(async () => {
        const anim = await db.models.animation.create(data)
        await anim.setStudios(data.studios)

        anim.placeholder = data.cover ? await img(data.cover, 'anim', anim.id) : ''
        anim.headerColor = data.cover ? await getImgColor(`anim/${anim.id}`) : undefined
        await anim.save()

        await createLog(db, 'createAnimation', data, user.username)

        return anim
      })
    },
    updateAnimation: async (parent, data, { db, user }, info) => {
      return db.transaction(async () => {
        const anim = await db.models.animation.findByPk(data.id)
        Object.entries(data).forEach(([key, value]) => {
          anim[key] = value
        })
        anim.setStudios(data.studios)

        if (data.cover) {
          anim.placeholder = await img(data.cover, 'anim', anim.id)
          anim.headerColor = await getImgColor(`anim/${anim.id}`)
        }

        await anim.save()
        await createUpdateLog(db, 'updateAnimation', anim, user.username)
        return anim
      })
    },
    deleteAnimation: async (parent, { id }, { user, db }) => {
      return db.transaction(async () => {
        const anim = await db.models.animation.findByPk(id)

        const log = {
          ...anim.dataValues,
          studios: await anim.getStudios()
        }

        await createLog(db, 'deleteAnim', log, user.username)
        await anim.destroy()
      })
    },

    updateAlbum: async (parent, data, { db, user, res }, info) => {
      return db.transaction(async () => {
        data.artists = data.artists ? data.artists.map(artist => { return { name: artist, slug: slugify(artist) } }) : []
        await db.models.artist.bulkCreate(data.artists, { ignoreDuplicates: true })

        const ost = await db.models.ost.findByPk(data.id)
        const triggerPost = (data.status !== ost.status.repeat(1)) && data.status === 'show'

        // implement better log lol lmao

        await Promise.all([
          ost.update(data),
          ost.setArtists(data.artists.map(({ slug }) => slug)),
          ost.setClasses(data.classes || []),
          ost.setCategories(data.categories || []),
          ost.setPlatforms(data.platforms || []),
          ost.setGames(data.games || []),
          ost.setRelated(data.related || []),
          ost.setAnimations(data.animations || []),
          db.models.disc.destroy({ where: { ostId: ost.dataValues.id } }).then(() => (data.discs || []).map(disc => ost.createDisc(disc))),
          db.models.store.destroy({ where: { ostId: ost.dataValues.id } }).then(() => (data.stores || []).map(store => ost.createStore(store))),
          db.models.download.destroy({ where: { ostId: ost.dataValues.id } }).then(() => (data.downloads || []).map(download => ost.createDownload(download, { include: [db.models.link] }))),
          createUpdateLog(db, 'updateAlbum', ost, user.username)
        ])

        if (data.cover) {
          ost.placeholder = await img(data.cover, 'album', ost.id)
          ost.headerColor = await getImgColor(`album/${ost.id}`)
          await ost.save()
        }

        if (triggerPost) {
          postReddit(ost)
          postDiscord(ost.id)
        }

        // res.unstable_revalidate(`/album/${ost.id}`)
        return ost
      })
    }

  }
}

export default composeResolvers(resolvers, resolversComposition)
