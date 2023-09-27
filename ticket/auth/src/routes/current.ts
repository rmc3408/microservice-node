import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/api/users/current', (req: Request, res: Response) => {
  res.send({ id: 1, name: 'Raph' })
})

export { router as currentUserRouter }
