import app from '@adonisjs/core/services/app'
import { ExceptionHandler, HttpContext } from '@adonisjs/core/http'
import { errors as authErrors } from '@adonisjs/auth'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: any, ctx: HttpContext) {
    let code = error.code || 'UNKNOWN_ERROR'
    let message = error.message || 'An unknown error occurred'
    let status = error.status || 500
    let details: any = undefined

    // map known exception codes
    if (error.code === 'E_VALIDATION_ERROR') {
      status = 422
      code = 'VALIDATION_FAILED'
      details = error.messages
    } else if (error.code === 'E_UNAUTHORIZED_ACCESS' || error instanceof authErrors.E_UNAUTHORIZED_ACCESS) {
      status = 401
      code = 'UNAUTHORIZED'
      message = 'Unauthorized access'
    } else if (error.code === 'E_ROUTE_NOT_FOUND') {
      status = 404
      code = 'ROUTE_NOT_FOUND'
      message = 'Route not found'
    } else if (error.code === 'E_ROW_NOT_FOUND') {
      status = 404
      code = 'RESOURCE_NOT_FOUND'
      message = 'Resource not found'
    }

    // if error provides its own handle method, let it handle the response
    if (typeof error.handle === 'function') {
      return error.handle(error, ctx)
    }

    return ctx.response.status(status).json({
      error: {
        code,
        message,
        ...(details && { details }),
      }
    })
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
