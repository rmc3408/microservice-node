const express = require('express')
const BodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const { PORT_QUERY, BASE_URL, PORT_BUS } = require('../constant')

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

  const allEvents = await axios.get(BASE_URL + PORT_BUS + '/events')

  for (let { type, data } of allEvents.data) {
    console.log('processing all QUERY events: ', type)
    handleEvents(type, data)
  }
  console.log(posts['59212a30'].comments)
})

function handleEvents(type, data) {
  if (type === 'PostCreated') {
    const { id, title } = data
    posts[id] = { id, title, comments: [] }
  }
  if (type === 'CommentsCreated') {
    const { id, content, postId } = data
    posts[postId].comments.push({ id, content, status: 'UNDER_ANALYSIS' })
  }
  if (type === 'CommentsUpdated') {
    const { id, content, postId, status } = data
    console.log(data)

    posts[postId].comments.find((comment) => {
      if (comment.id === id) {
        comment.status = status
        comment.content = content.toUpperCase()
      }
    })
  }
}
