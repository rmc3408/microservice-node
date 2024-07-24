import { Express } from 'express'
import { errorHandler, NotFoundError } from '@rmc3408/microservice-node-common'


export default async function setupRouter(app: Express) {
  //app.use(createRouter)

  app.all('*', () => {
    throw new NotFoundError()
  })
  app.use(errorHandler)
}