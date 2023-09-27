import express, { Express } from 'express'
import bodyParser from 'body-parser'

import { currentUserRouter } from './routes/current'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

const PORT_AUTH: number = 4000

const app: Express = express()
app.use(bodyParser.json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.listen(PORT_AUTH, () => console.log('Listening AUTH on port', PORT_AUTH))
