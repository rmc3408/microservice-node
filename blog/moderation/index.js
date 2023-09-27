const express = require('express')
const BodyParser = require('body-parser')
const axios = require('axios')
const { K8S_BUS_URL, PORT_BUS, PORT_MODERATOR } = require('./constant')

const app = express()
app.use(BodyParser.json())

app.post('/events', async (req, res) => {
  const event = req.body
  const { type, data } = event

  if (type === 'CommentsCreated') {
    const analyzedStatus = data.content.includes('orange') ? 'REJECTED' : 'APPROVED'
    const moderatorCreatedEvent = {
      type: 'CommentsModeratorCreated',
      data: {
        ...data,
        status: analyzedStatus,
      },
    }
    await axios.post(K8S_BUS_URL + PORT_BUS + '/events', moderatorCreatedEvent)
  }
  res.send({ status: 'OK' })
})

app.listen(PORT_MODERATOR, () => {
  console.log(`Listening MODERATOR at ${PORT_MODERATOR}`)
})
