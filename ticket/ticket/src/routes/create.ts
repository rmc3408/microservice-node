import express, { Request, Response } from 'express'
import {
  authHandler,
  currentUserHandler,
  ticketValidator,
} from '@rmc3408/microservice-node-common'
import Ticket from '../models/ticket'
import { TicketCreatedPublisher } from '../events/created/pub'
import { stan } from '../config/nats'

const router = express.Router()

router.post(
  '/api/tickets/create',
  authHandler,
  currentUserHandler,
  ticketValidator,
  async (req: Request, res: Response) => {
    const { title, price } = req.body
    const newTicket = Ticket.build({ title, price, userId: req.currentUser!.id })
    await newTicket.save()

    await new TicketCreatedPublisher(stan.client).publish({
      id: newTicket.id,
      title: newTicket.title,
      price: newTicket.price,
      userId: newTicket.userId,
    })

    res.status(201).send(newTicket)
  }
)

export { router as createTicketRouter }
