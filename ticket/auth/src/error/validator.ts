import { ValidationError } from 'express-validator'
import CustomError from './custom'

class RequestValidatorError extends CustomError {
  public statusCode: number = 400
  public reasons: ValidationError[]

  constructor(listErrors: ValidationError[]) {
    super()
    this.reasons = listErrors
  }

  public serializeError() {
    return this.reasons.map((error) => {
      if (error.type === 'field') {
        return { message: error.msg, field: error.path }
      }
      return { message: error.msg }
    })
  }
}

export default RequestValidatorError
