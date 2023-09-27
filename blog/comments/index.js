const express = require('express')
const BodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const axios = require('axios')

const { K8S_BUS_URL, PORT_BUS, PORT_COMMENTS } = require('./constant')
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

  const newComment = { id, content, status: 'PENDING' }

  //get existing or new array of comments.
  if (commentsByPost[postId]) {
    commentsByPost[postId].push(newComment)
  } else {
    commentsByPost[postId] = []
    commentsByPost[postId].push(newComment)
  }

  await axios.post(K8S_BUS_URL + PORT_BUS + '/events', {
    type: 'CommentsCreated',
    data: { postId, ...newComment },
  })

  res.status(201).send(newComment)
})

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  console.log('COMMENTS event is', type)

  if (type === 'CommentsModeratorCreated') {
    const { id, postId, content, status } = data

    commentsByPost[postId].find((comment) => {
      if (comment.id === id) {
        comment.status = status
      }
    })

    await axios.post(K8S_BUS_URL + PORT_BUS + '/events', {
      type: 'CommentsUpdated',
      data: { id, content, postId, status },
    })
  }
  res.send({})
})

app.listen(PORT_COMMENTS, () => {
  console.log(`Listening COMMENTS at ${PORT_COMMENTS}`)
})
