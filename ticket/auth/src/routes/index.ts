import { Express } from 'express'
import { currentUserRouter } from './current'
import { signinRouter } from './signin'
import { signoutRouter } from './signout'
import { signupRouter } from './signup'
import { errorHandler, NotFoundError } from '@rmc3408/microservice-node-common'

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

