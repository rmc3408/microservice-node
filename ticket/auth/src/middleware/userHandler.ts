import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import RequestValidatorError from '../error/validator'

export const userValidator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
]

export default function userValidatorHandler(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new RequestValidatorError(errors.array())
  }

  next()
}
