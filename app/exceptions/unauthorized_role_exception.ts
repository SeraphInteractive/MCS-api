import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class UnauthorizedRoleException extends Exception {
  constructor(requiredRole: string) {
    super(`Insufficient role. Required: ${requiredRole}`, {
      status: 403,
      code: 'INSUFFICIENT_ROLE'
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
