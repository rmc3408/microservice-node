import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import { BadRequestError, validatorHandler, userValidator } from '@rmc3408/microservice-node-common'

const router = express.Router()

router.post('/api/users/signup', userValidator, validatorHandler, async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new BadRequestError('Email in use')
  }

  const newUser = new User({ email, password })
  await newUser.save()

  const jwtUser = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWTKEY!)
  req.session = {}
  req.session.jwt = jwtUser

  res.status(201).send(newUser)
})

export { router as signupRouter }
