import express, { Request, Response } from 'express'

const router = express.Router()

router.post('/api/users/signout', (req: Request, res: Response) => {
  res.send('See you later')
})

export { router as signoutRouter }
