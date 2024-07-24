import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import { BadRequestError, userValidatorHandler, userValidator } from '@rmc3408/microservice-node-common'
import { Password } from '../services/hashing'

const router = express.Router()

router.post('/api/users/signin', userValidator, userValidatorHandler, async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if (!existingUser) {
    throw new BadRequestError('No user with this email')
  }

  const isPasswordMatch = await Password.verify(existingUser.password, password)
  if (!isPasswordMatch) throw new BadRequestError('Invalid Password')

  const jwtUser = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWTKEY!)
  req.session = { jwt: jwtUser }

  res.send(existingUser)
})

export { router as signinRouter }
