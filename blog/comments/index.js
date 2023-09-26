const express = require('express')
const BodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const axios = require('axios')

const { BASE_URL, PORT_BUS, PORT_COMMENTS } = require('../constant')
const cors = require('cors')

const app = express()
app.use(BodyParser.json())
app.use(cors())

const commentsByPost = {}

app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id
  res.send(commentsByPost[postId] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id
  const id = randomBytes(4).toString('hex')
  const { content } = req.body

  const newComment = { id, content }

  //get existing or new array of comments.
  if (commentsByPost[postId]) {
    commentsByPost[postId].push(newComment)
  } else {
    commentsByPost[postId] = []
    commentsByPost[postId].push(newComment)
  }

  await axios.post(BASE_URL + PORT_BUS + '/events', {
    type: 'CommentsCreated',
    data: { id, content, postId },
  })

  res.status(201).send(newComment)
})

app.post('/events', async (req, res) => {
  const event = req.body
  console.log('COMMENTS event is', event.type)
  res.send({})
})

app.listen(PORT_COMMENTS, () => {
  console.log(`Listening COMMENTS at ${PORT_COMMENTS}`)
})
