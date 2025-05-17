import { authHandler, BadRequestError, currentUserHandler, NotAuthorizedError, NotFoundError } from '@rmc3408/microservice-node-common'
import express, { Request, Response } from 'express'
import { Types } from 'mongoose'
import Order from '../models/order'

const router = express.Router()

router.get('/api/orders/read/:id', authHandler, currentUserHandler, async (req: Request, res: Response) => {
  
  let newObjectId
  try {
    newObjectId = new Types.ObjectId(req.params.id)
  } catch {
    throw new BadRequestError('Object Id must be valid')
  }
  const found = await Order.find({ _id: newObjectId }).populate('ticket')

  if (found.length === 0) {
    throw new NotFoundError()
  }
  if (found[0].userId !== req.currentUser!.id) {
    throw new NotAuthorizedError()
  }
  
  res.status(200).send(found[0])
})

export { router as readOneOrderRouter }
