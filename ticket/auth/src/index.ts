import express from 'express'
import bodyParser from 'body-parser'

const PORT_AUTH = 4000

const app = express()
app.use(bodyParser.json())

app.get('/api/users/current', (req, res) => {
  res.send({ id: 1, name: 'Raph' })
})

app.listen(PORT_AUTH, () => console.log('Listening AUTH on port', PORT_AUTH))
