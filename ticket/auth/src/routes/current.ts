import express, { Request, Response } from 'express'
import { authHandler, currentUserHandler } from '@rmc3408/microservice-node-common'

const router = express.Router()

router.get('/api/users/current', authHandler, currentUserHandler, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }
