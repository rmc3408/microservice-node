import express, { Request, Response } from 'express'
import { authHandler, currentUserHandler, ticketValidatorHandler, ticketValidator } from '@rmc3408/microservice-node-common'
import Ticket from '../models/ticket'


const router = express.Router()

router.post('/api/tickets/create', authHandler, currentUserHandler, ticketValidator, ticketValidatorHandler, async (req: Request, res: Response) => {
  const { title, price } = req.body
  const newTicket = Ticket.build({ title, price, userId: req.currentUser!.id })
  await newTicket.save()

  res.status(201).send(newTicket)
})

export { router as createTicketRouter }