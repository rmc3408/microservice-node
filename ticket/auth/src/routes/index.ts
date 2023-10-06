import { Express } from 'express'
import { currentUserRouter } from './current'
import { signinRouter } from './signin'
import { signoutRouter } from './signout'
import { signupRouter } from './signup'
import errorHandler from '../middleware/errHandler'
import NotFoundError from '../error/notFound'

//Router
export default function setupRouter(app: Express) {
  app.use(currentUserRouter)
  app.use(signinRouter)
  app.use(signoutRouter)
  app.use(signupRouter)
  app.all('*', () => {
    throw new NotFoundError()
  })
  app.use(errorHandler)
}

