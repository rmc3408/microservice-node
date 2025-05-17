import { authHandler, NotFoundError } from '@rmc3408/microservice-node-common'
import express, { Request, Response } from 'express'
import Order from '../models/order'

const router = express.Router()

router.get('/api/orders/read', authHandler, async (req: Request, res: Response) => {
  const found = await Order.find({ userId: req.currentUser!.id }).populate('ticket')
  if (!found) {
    throw new NotFoundError()
  }
  res.status(200).send(found)
})

export { router as readAllOrderRouter }

