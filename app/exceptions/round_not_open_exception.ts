import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class RoundNotOpenException extends Exception {
  constructor(roundId: string, currentStatus: string) {
    super(`Round ${roundId} is not open (current status: ${currentStatus})`, {
      status: 409,
      code: 'ROUND_NOT_OPEN'
    })
  }

  public async handle(error: this, ctx: HttpContext) {
    return ctx.response.status(error.status).json({
      error: {
        code: error.code,
        message: error.message
      }
    })
  }
}
