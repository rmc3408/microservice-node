import { Express } from 'express'
import { errorHandler, NotFoundError } from '@rmc3408/microservice-node-common'
import { createTicketRouter } from './create'
import { readAllTicketRouter } from './readAll'
import { readOneTicketRouter } from './readOne'
import { updateTicketRouter } from './update'

export default async function setupRouter(app: Express) {
  app.use(createTicketRouter)
  app.use(readAllTicketRouter)
  app.use(readOneTicketRouter)
  app.use(updateTicketRouter)

  app.all('*', () => {
    throw new NotFoundError()
  })
  app.use(errorHandler)
}