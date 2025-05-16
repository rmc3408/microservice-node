import express, { Request, Response } from 'express'
import Order from '../models/order'

const router = express.Router()

router.get('/api/orders/read', async (req: Request, res: Response) => {
  const found = await Order.find()
  res.status(200).send(found)
})

export { router as readAllOrderRouter }
