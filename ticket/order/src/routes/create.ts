import {
  authHandler,
  BadRequestError,
  currentUserHandler,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from '@rmc3408/microservice-node-common'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import Ticket from '../models/ticket'
import Order from '../models/order'
//import { TicketCreatedPublisher } from '../events/created/pub'
//import { stan } from '../config/nats'

const router = express.Router()
const OrderValidator = [
  body('ticketId')
    .isMongoId()
    .withMessage('TicketId must be a valid MongoDB ObjectId')
]

router.post('/api/orders/create', authHandler, currentUserHandler, OrderValidator, async (req: Request, res: Response) => {
    const { ticketId } = req.body
    const existingUser = req.currentUser?.id

    if (!existingUser) {
      throw new NotAuthorizedError();
    }
    
    // Find the existing ticket will be reserved
    const existingTicket = await Ticket.findById({ _id: ticketId })
    if (!existingTicket) {
      throw new NotFoundError();
    }

    // Check if the ticket is already reserved from query in all orders and ticket status is not available
    const ticketReserved = await existingTicket.isReserved()

    if (ticketReserved) {
      throw new BadRequestError('Ticket is already reserved')
    }

    // Calculate an expiration date for the order - 15 after the order is created
    const expiration = new Date().getSeconds() + 15 * 60 // 15 minutes
    // Build the order and save it to the database
    const newOrder = Order.build({ 
      userId: req.currentUser!.id,
      status: OrderStatus.CREATED,
      expiresAt: new Date(expiration),
      ticket: existingTicket.id,
    })
    await newOrder.save()
    
    // Publish an event saying that a ticket was created
    // await new TicketCreatedPublisher(stan.client).publish({
    //   id: newTicket.id,
    //   title: newTicket.title,
    //   price: newTicket.price,
    //   userId: newTicket.userId,
    // })

    res.status(201).send(newOrder)
  }
)

export { router as createOrderRouter }

