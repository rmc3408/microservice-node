import { Express } from 'express'
import { errorHandler, NotFoundError } from '@rmc3408/microservice-node-common'
import { createOrderRouter } from './create'
import { readAllOrderRouter } from './readAll'
import { readOneOrderRouter } from './readOne'
import { deleteTicketRouter } from './delete'

export default async function setupRouter(app: Express) {
  app.use(createOrderRouter)
  app.use(readAllOrderRouter)
  app.use(readOneOrderRouter)
  app.use(deleteTicketRouter)

  app.all('*', () => {
    throw new NotFoundError()
  })
  app.use(errorHandler)
}