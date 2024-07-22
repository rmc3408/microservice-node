import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import NotAuthorizedError from '../error/notAuthError'

type UserPayload = {
  email: string
  id: string
  iat: number
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: string | UserPayload
    }
  }
}

export default function authHandler(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.jwt) {
    return next()
  }

  jwt.verify(req.session?.jwt, process.env.JWTKEY!, function (err: any, decoded: any) {
    if (err) {
      throw new NotAuthorizedError(err.message)
    }
    req.currentUser = decoded
  })

  next()
}
