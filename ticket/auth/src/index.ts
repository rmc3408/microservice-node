import express, { Express } from 'express'
require('express-async-errors')
import bodyParser from 'body-parser'

import { currentUserRouter } from './routes/current'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middleware/errHandler'
import NotFoundError from './error/notFound'
import startDatabase from './config/mongo'

const PORT_AUTH: number = 4000

const app: Express = express()
app.use(bodyParser.json())

//Router
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.all('*', () => {
  throw new NotFoundError()
})
app.use(errorHandler)

// Start Servers
startDatabase()
app.listen(PORT_AUTH, () => console.log('Listening AUTH on port', PORT_AUTH))
