import express, { Request, Response } from 'express'
import authHandler from '../middleware/authHandler'
import currentUserHandler from '../middleware/currentUserHandler'

const router = express.Router()

router.get('/api/users/current', authHandler, currentUserHandler, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }
