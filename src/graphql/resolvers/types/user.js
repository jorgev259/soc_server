import pages from '../../../config/pages.json'

const userResolvable = {
  roles: parent => parent.getRoles(),
  permissions: async parent => {
    const roles = await parent.getRoles()
    return roles.map(r => r.permissions).flat()
  },
  pages: async parent => {
    const roles = await parent.getRoles()
    const permissions = roles.map(r => r.permissions).flat()

    return pages.filter(({ perms, name }) => name && perms.some(r => permissions.includes(r)))
  },
  comments: (user, _, { db }) => user.getComments(),
  favorites: user => user.getAlbums(),
  imgUrl: async user => `https://cdn.sittingonclouds.net/user/${
    user.imgId ? `${user.username}_${user.imgId}` : 'default'
  }.png`
}

const funcs = {
  User: userResolvable,
  UserMe: userResolvable,
  Role: { permissions: parent => typeof parent.permissions === 'string' || parent.permissions instanceof String ? JSON.parse(parent.permissions) : parent.permissions }
}

export default funcs
