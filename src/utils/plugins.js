import { Client, Intents } from 'discord.js'
import { post } from 'axios'

const discordToken = process.env.DISCORD

export const discordClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] })
if (discordToken) discordClient.login(discordToken).then(() => console.log(`Logged in as ${discordClient.user.tag}!`))

const getImageUrl = (id, type = 'album') => `https://cdn.sittingonclouds.net/${type}/${id}.png`
const fullImage = (id, quality = 75) => `https://www.sittingonclouds.net/_next/image?w=3840&q=${quality}&url=${getImageUrl(id)}`

export async function postWebhook (album, userText = '') {
  const url = `https://www.sittingonclouds.net/album/${album.id}`
  const content = `<${url}${userText}>`
  const payload = {
    content,
    embeds: [{
      title: album.title,
      description: album.subTitle || album.artists.map(a => a.name).join(' - '),
      url,
      color: parseInt(album.headerColor.replace('#', ''), 16),
      thumbnail: { url: fullImage(album.id, 50) },
      author: { name: 'Sitting On Clouds' }
    }]
  }
  console.log(payload)

  post(process.env.WEBHOOK_URL, payload)
    .catch(err => console.log(err))
}
