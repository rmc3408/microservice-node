import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import RequestValidatorError from '../error/validator'
import BadRequestError from '../error/badRequest'
import User from '../models/user'

const router = express.Router()

const bodyValidator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
]

router.post('/api/users/signup', bodyValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new RequestValidatorError(errors.array())
  }

  const { email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new BadRequestError('Email in use')
  }

  const newUser = new User({ email, password })
  await newUser.save()

  res.status(201).send(newUser)
})

export { router as signupRouter }
