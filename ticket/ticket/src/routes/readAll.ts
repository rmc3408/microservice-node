import express, { Request, Response } from 'express'
import Ticket from '../models/ticket'

const router = express.Router()

router.get('/api/tickets/read', async (req: Request, res: Response) => {
  const found = await Ticket.find()
  res.status(200).send(found)
})

export { router as readAllTicketRouter }