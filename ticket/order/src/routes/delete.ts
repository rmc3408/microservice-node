import {
    authHandler,
    currentUserHandler,
    NotAuthorizedError,
    NotFoundError,
    OrderStatus,
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
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
      throw new NotFoundError()
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError()
    }

    order.status = OrderStatus.CANCELLED
    await order.save()
    // await new TicketUpdatedPublisher(stan.client).publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    // })

    res.status(204).send(order)
  }
)

export { router as deleteTicketRouter }
