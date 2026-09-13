import { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import UnauthorizedRoleException from '#exceptions/unauthorized_role_exception'

export default class RoleGuardMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: { roles: string[] }) {
    const userRole = ctx.auth.user?.role || 'voter'
    
    // role hierarchy mapping where higher level includes lower level capabilities
    const hierarchy: Record<string, number> = {
      voter: 1,
      contributor: 2,
      senior_contributor: 3,
      supervisor: 4,
      moderator: 4,
      admin: 5
    }
    
    const userLevel = hierarchy[userRole] || 1
    
    // check if user meets at least one required role level
    const hasRole = options.roles.some(role => {
      const requiredLevel = hierarchy[role] || 1
      return userLevel >= requiredLevel
    })

    if (!hasRole) {
      throw new UnauthorizedRoleException(options.roles.join(' or '))
    }

    await next()
  }
}
