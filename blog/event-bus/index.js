const express = require('express')
const BodyParser = require('body-parser')
const axios = require('axios')
const { PORT_BUS, BASE_URL, PORT_COMMENTS, PORT_POSTS, PORT_QUERY } = require('../constant')

const app = express()
app.use(BodyParser.json())

const events = []

app.post('/events', async (req, res) => {
  const event = req.body

  events.push(event)
  console.log(event)

  const promises = []

  promises.push(axios.post(BASE_URL + PORT_POSTS + '/events', event))
  promises.push(axios.post(BASE_URL + PORT_COMMENTS + '/events', event))
  promises.push(axios.post(BASE_URL + PORT_QUERY + '/events', event))

  Promise.all(promises)
    .then((values) => console.log(values.data))
    .catch((e) => console.log(e.message))

  res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(PORT_BUS, () => {
  console.log(`Listening EVENT_BUS at ${PORT_BUS}`)
})
