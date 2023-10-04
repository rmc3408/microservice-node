import express, { Express } from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import errorHandler from './middleware/errHandler'
import NotFoundError from './error/notFound'
import startDatabase from './config/mongo'
import BadRequestError from './error/badRequest'

const PORT_AUTH: number = 4000

const app: Express = express()
app.set('trust proxy', true)
app.use(bodyParser.json())
app.use(cookieSession({ signed: false, secure: true }))

//Router
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.all('*', () => {
  throw new NotFoundError()
})
app.use(errorHandler)

// Enviroment Check from Kubernetes
if (!process.env.JWT_KEY) throw new BadRequestError('JWT_key must be defined')

// Start Servers
startDatabase()
app.listen(PORT_AUTH, () => console.log('Listening AUTH on port', PORT_AUTH))
