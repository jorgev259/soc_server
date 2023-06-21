import { Client, Intents } from 'discord.js'
import { post } from 'axios'

const discordToken = process.env.DISCORD

export const discordClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] })
if (discordToken) discordClient.login(discordToken).then(() => console.log(`Logged in as ${discordClient.user.tag}!`))

export async function postWebhook (album, userText = '') {
  const url = `https://www.sittingonclouds.net/album/${album.id}`
  const content = `<${url}>${userText}`
  const payload = {
    content,
    embeds: [{
      title: album.title,
      description: album.subTitle || album.artists.map(a => a.name).join(' - '),
      url,
      color: parseInt(album.headerColor.replace('#', ''), 16),
      thumbnail: { url: `https://cdn.sittingonclouds.net/album/${album.id}.png` },
      author: { name: 'Sitting On Clouds' }
    }]
  }

  post(process.env.WEBHOOK_URL, payload)
    .catch(err => console.log(err))
}
