import CustomError from './custom'

class DatabaseError extends CustomError {
  public statusCode: number = 500
  public reasons: string

  constructor(message: string = 'Failed to connect to Database') {
    super()
    this.reasons = message
  }

  public serializeError() {
    return [{ message: this.reasons }]
  }
}

export default DatabaseError
