import express, { Request, Response } from 'express'
import {
  authHandler,
  currentUserHandler,
} from '@rmc3408/microservice-node-common'
import Order from '../models/order'
import { body } from 'express-validator'
//import { TicketCreatedPublisher } from '../events/created/pub'
//import { stan } from '../config/nats'

const router = express.Router()
const OrderValidator = [
  body('ticketId')
  .not()
  .isEmpty()
  .withMessage('TicketId must be provided')
  .isMongoId()
  .withMessage('TicketId must be a valid MongoDB ObjectId')
]

router.post('/api/orders/create', authHandler, currentUserHandler, OrderValidator, async (req: Request, res: Response) => {
    const { ticketId } = req.body
    const existingUser = req.currentUser?.id

    if (!existingUser) {
      return res.status(401).send({ error: 'User not authenticated' })
    }
    
    const newTicket = Order.build({ ticketId, userId: req.currentUser!.id })
    await newTicket.save()

    // await new TicketCreatedPublisher(stan.client).publish({
    //   id: newTicket.id,
    //   title: newTicket.title,
    //   price: newTicket.price,
    //   userId: newTicket.userId,
    // })

    res.status(201).send(newTicket)
  }
)

export { router as createOrderRouter }
