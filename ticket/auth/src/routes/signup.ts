import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import RequestValidatorError from '../error/validator'
import DatabaseError from '../error/database'

const router = express.Router()

const bodyValidator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
]

router.post('/api/users/signup', bodyValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new RequestValidatorError(errors.array())
  }

  const { email, password } = req.body

  console.log('Creating a user...')

  throw new DatabaseError()

  res.send({ email, password })
})

export { router as signupRouter }
