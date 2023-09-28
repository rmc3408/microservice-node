//not a good approach, because it cannot check if Database or RequestValidator
export interface ICustomError {
  statusCode: number
  reasons: any
  serializeError(): Array<{
    message: string
    field?: string
  }>
}

abstract class CustomError extends Error {
  abstract statusCode: number
  abstract reasons: any

  constructor(message?: string) {
    super(message)
  }

  abstract serializeError(): Array<{
    message: string
    field?: string
  }>
}

export default CustomError
