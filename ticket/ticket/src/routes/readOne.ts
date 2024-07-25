import express, { Request, Response } from 'express'
import { BadRequestError, NotFoundError } from '@rmc3408/microservice-node-common'
import Ticket from '../models/ticket'
import { Types } from 'mongoose'

const router = express.Router()

router.get('/api/tickets/read/:id', async (req: Request, res: Response) => {
  
  let newObjectId
  try {
    newObjectId = new Types.ObjectId(req.params.id)
  } catch {
    throw new BadRequestError('Object Id must be valid')
  }
  const found = await Ticket.find({ _id: newObjectId })

  if (found.length === 0) {
    throw new NotFoundError()
  }
  res.status(200).send(found[0])
})

export { router as readOneTicketRouter }