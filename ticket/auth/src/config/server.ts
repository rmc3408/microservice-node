import express, { Express } from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import setupRouter from '../routes'


const app: Express = express()

app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({ signed: false, secure: true }))

//Router
setupRouter(app)


export default app
