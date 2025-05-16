import {
    authHandler,
    currentUserHandler,
    NotAuthorizedError,
    NotFoundError,
    ticketValidator,
    ticketValidatorHandler,
} from '@rmc3408/microservice-node-common'
import express, { Request, Response } from 'express'
// import { stan } from '../config/nats'
// import { TicketUpdatedPublisher } from '../events/created/pub'
import Order from '../models/order'

const router = express.Router()

router.delete(
  '/api/orders/delete/:id',
  authHandler,
  currentUserHandler,
  ticketValidator,
  ticketValidatorHandler,
  async (req: Request, res: Response) => {
    const ticket = await Order.findById(req.params.id)

    if (!ticket) {
      throw new NotFoundError()
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError()
    }

    await ticket.deleteOne()
    // await new TicketUpdatedPublisher(stan.client).publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    // })

    res.status(204).send(ticket)
  }
)

export { router as deleteTicketRouter }
