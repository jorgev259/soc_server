import { AuthenticationError, ForbiddenError } from 'apollo-server-errors'
import path from 'path'

import db from '../sequelize/startDB'
import { getImgColor, processImage } from './image'
import { getSession, getUser } from '@/next/lib/getSession'

export const isAuthed = next => async (root, args, context, info) => {
  const session = await getSession()
  const { username = null } = session

  if (!username) throw new AuthenticationError()
  return next(root, args, context, info)
}

const hasPerm = perm => next => async (root, args, context, info) => {
  const { db } = context
  const user = await getUser(db)
  const roles = await user.getRoles()
  const permissions = roles.map(r => r.permissions).flat()
  if (!permissions.includes(perm)) throw new ForbiddenError()

  return next(root, args, context, info)
}

export const hasRole = role => [isAuthed, hasPerm(role)]
export const hasRolePage = allowedRoles =>
  async (context, props = {}) => {
    const { req, res } = context
    const session = await getSession(req, res)
    const { permissions = [] } = session

    if (!permissions.some(p => allowedRoles.includes(p))) return { redirect: { destination: '/404', permanent: false } }
    return { props }
  }

export const placeholder = (parent, folder) => {
  if (!parent.placeholder) solvePlaceholder(parent, folder)

  return parent.placeholder
}

async function solvePlaceholder (parent, folder) {
  const id = parent.slug || parent.id
  const pathString = path.join('/var/www/soc_img/img', folder)
  const fullPath = path.join(pathString, `${id}.png`)

  parent.placeholder = await processImage(fullPath)
  await parent.save()
}

export const headerColor = async (parent, folder) => parent.headerColor || await solveHeaderColor(parent, folder) || '#ffffff'

async function solveHeaderColor (parent, folder) {
  const color = await getImgColor(`${folder}/${parent.slug || parent.id}`)
  parent.headerColor = color
  parent.save()

  return color
}

export async function solveRating (album) {
  const [rating] = await album.getRatings({
    attributes: [
      db.literal(`"${album.id}" as id`),
      [db.fn('COALESCE', db.fn('avg', db.col('score')), 0), 'score'],
      [db.fn('COUNT', '*'), 'users']
    ],
    raw: true
  })

  return rating
}
