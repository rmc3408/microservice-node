import CustomError from './custom'

class NotAuthorizedError extends CustomError {
  public statusCode: number = 401
  public reasons: string

  constructor(message: string = 'Not Authorized') {
    super()
    this.reasons = message
  }

  public serializeError() {
    return [{ message: this.reasons }]
  }
}

export default NotAuthorizedError
