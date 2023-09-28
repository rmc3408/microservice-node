import CustomError from './custom'

class NotFoundError extends CustomError {
  statusCode: number = 404
  reasons: string = 'Route not found'

  constructor() {
    super()
  }

  serializeError() {
    return [{ message: this.reasons }]
  }
}

export default NotFoundError
