export class ValidationError extends Error {
  constructor (errors) {
    super('Validation Error')
    this.errors = errors
  }
}

export class ApiError extends Error {
  constructor (context) {
    super('API Error')
    this.context = context
  }
}
