const express = require('express')
const BodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const { PORT_QUERY } = require('../constant')

const posts = {}

const app = express()
app.use(BodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body

  handleEvents(type, data)

  res.send({})
})

app.listen(PORT_QUERY, async () => {
  console.log(`Listening QUERY at ${PORT_QUERY}`)
})

function handleEvents(type, data) {
  if (type === 'PostCreated') {
    const { id, title } = data
    posts[id] = { id, title, comments: [] }
  }
  if (type === 'CommentsCreated') {
    const { id, content, postId } = data
    posts[postId].comments.push({ id, content })
  }
}
