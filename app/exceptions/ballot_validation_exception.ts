import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class BallotValidationException extends Exception {
  public errors: string[]

  constructor(errors: string[]) {
    super('Ballot validation failed', {
      status: 422,
      code: 'BALLOT_VALIDATION_FAILED'
    })
    this.errors = errors
  }

  public async handle(error: this, ctx: HttpContext) {
    return ctx.response.status(error.status).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.errors
      }
    })
  }
}
