import { BadRequestError, NotFoundError } from '@rmc3408/microservice-node-common'
import express, { Request, Response } from 'express'
import { Types } from 'mongoose'
import Order from '../models/order'

const router = express.Router()

router.get('/api/orders/read/:id', async (req: Request, res: Response) => {
  
  let newObjectId
  try {
    newObjectId = new Types.ObjectId(req.params.id)
  } catch {
    throw new BadRequestError('Object Id must be valid')
  }
  const found = await Order.find({ _id: newObjectId })

  if (found.length === 0) {
    throw new NotFoundError()
  }
  res.status(200).send(found[0])
})

export { router as readOneOrderRouter }
