import { Request, Response, NextFunction } from 'express'
import NotAuthorizedError from '../error/notAuthError'

export default function currentUserHandler(req: Request, res: Response, next: NextFunction) {
  if (!req.currentUser) {
    throw new NotAuthorizedError('Current User not found')
  }

  next()
}
