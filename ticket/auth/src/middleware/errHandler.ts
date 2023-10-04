import { Request, Response, NextFunction } from 'express'
import CustomError from '../error/custom'

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log('ErrorHandler activated')

  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeError() })
  } else {
    res.status(400).send({ errors: [{ message: 'Something went wrong' }] })
  }
}
