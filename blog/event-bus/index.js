const express = require('express')
const BodyParser = require('body-parser')
const axios = require('axios')
const {
  PORT_BUS,
  PORT_COMMENTS,
  PORT_POSTS,
  PORT_QUERY,
  PORT_MODERATOR,
  K8S_POSTS_URL,
  K8S_MODERATOR_URL,
  K8S_QUERY_URL,
  K8S_COMMENTS_URL,
} = require('./constant')

const app = express()
app.use(BodyParser.json())

const events = []

app.post('/events', async (req, res) => {
  const event = req.body

  events.push(event)
  console.log(event)

  const promises = []

  promises.push(axios.post(K8S_POSTS_URL + PORT_POSTS + '/events', event))
  promises.push(axios.post(K8S_COMMENTS_URL + PORT_COMMENTS + '/events', event))
  promises.push(axios.post(K8S_QUERY_URL + PORT_QUERY + '/events', event))
  promises.push(axios.post(K8S_MODERATOR_URL + PORT_MODERATOR + '/events', event))

  Promise.allSettled(promises)
  //.then((values) => values.forEach((value) => console.log(value.status)))

  res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(PORT_BUS, () => {
  console.log(`Listening EVENT_BUS at ${PORT_BUS}`)
})
