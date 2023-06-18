// const Reddit = require('reddit')
import { Client, Intents } from 'discord.js'
import { post } from 'axios'

const redditConfig = process.env.REDDIT
const discordToken = process.env.DISCORD

// let reddit
// const flairs = []

async function runReddit () {
  // reddit = new Reddit(redditConfig)
  // flairs = await reddit.get('/r/sittingonclouds/api/link_flair_v2')
}
if (redditConfig) {
  runReddit()
}

export const discordClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] })
if (discordToken) discordClient.login(discordToken).then(() => console.log(`Logged in as ${discordClient.user.tag}!`))

export async function postReddit (instance) {
  /* const classList = await instance.getCategories()
    const classItem = classList[0]

    const flair = classItem && flairs.find(f => f.text === classItem.name)

    if (reddit) {
      reddit.post('/api/submit', {
        sr: 'sittingonclouds',
        kind: 'link',
        title: instance.title,
        url: `https://www.sittingonclouds.org/album/${instance.id}`,
        flair_id: flair ? flair.id : '',
        flair_text: flair ? flair.text : ''
      }).catch(console.log)
    } */
}

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
      color: parseInt(album.headerColor, 16),
      thumbnail: { url: fullImage(album.id, 50) },
      author: { name: 'Sitting On Clouds' }
    }]
  }

  post(process.env.WEBHOOK_URL, payload)
    .catch(err => console.log(err))
}

/* export async function postDiscord (id) {
  if (discordToken) {
    const guild = await discordClient.guilds.fetch(process.env.GUILD)
    await guild.channels.fetch()

    guild.channels.cache
      .find(c => c.name === 'last-added-soundtracks')
      .send(`https://www.sittingonclouds.net/album/${id}`)
  }
} */
