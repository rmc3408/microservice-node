import CustomError from './custom'

class BadRequestError extends CustomError {
  statusCode: number = 400
  reasons: string = 'User cannot be created'

  constructor(message?: string) {
    super()
    if (message) this.reasons = message
  }

  serializeError() {
    return [{ message: this.reasons }]
  }
}

export default BadRequestError
