import express, { Request, Response } from 'express'
import {
  NotFoundError,
  NotAuthorizedError,
  ticketValidator,
  authHandler,
  currentUserHandler,
} from '@rmc3408/microservice-node-common'
import Ticket from '../models/ticket'
import { TicketUpdatedPublisher } from '../events/created/pub'
import { stan } from '../config/nats'

const router = express.Router()

router.put(
  '/api/tickets/update/:id',
  authHandler,
  currentUserHandler,
  ticketValidator,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
      throw new NotFoundError()
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError()
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    })
    await ticket.save()
    await new TicketUpdatedPublisher(stan.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    })

    res.status(204).send(ticket)
  }
)

export { router as updateTicketRouter }
