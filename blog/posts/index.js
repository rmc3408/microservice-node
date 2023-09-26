const express = require('express')
const axios = require('axios')
const cors = require('cors')
const BodyParser = require('body-parser')
const { PORT_POSTS, BASE_URL, PORT_BUS } = require('./constant')

const app = express()
app.use(BodyParser.json())
app.use(cors())
const { randomBytes } = require('crypto')

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = { id, title }

  await axios.post(BASE_URL + PORT_BUS + '/events', {
    type: 'PostCreated',
    data: { id, title },
  })

  res.send(posts[id])
})

app.post('/events', (req, res) => {
  const event = req.body
  //console.log('POSTS event is', event.type)
  res.send({})
})

app.listen(PORT_POSTS, () => {
  console.log(`Listening POSTS at ${PORT_POSTS}`)
})
