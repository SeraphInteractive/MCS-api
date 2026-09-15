import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  // list all registered users from database
  async index({ response }: HttpContext) {
    const users = await User.query().orderBy('createdAt', 'desc')
    return response.ok({
      data: users.map((u) => ({
        id: u.id,
        discordId: u.discordId,
        discordUsername: u.discordUsername,
        discordAvatar: u.discordAvatar,
        role: u.role,
        createdAt: u.createdAt,
      })),
    })
  }

  // update a user's role (admin only)
  async updateRole({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({
        error: {
          code: 'USER_NOT_FOUND',
          message: `User with id ${params.id} was not found`,
        },
      })
    }

    const { role } = request.only(['role'])
    if (!role || typeof role !== 'string') {
      return response.badRequest({
        error: {
          code: 'INVALID_ROLE',
          message: 'A valid role string is required',
        },
      })
    }

    user.role = role.trim().toLowerCase()
    await user.save()

    return response.ok({
      data: {
        id: user.id,
        discordId: user.discordId,
        discordUsername: user.discordUsername,
        discordAvatar: user.discordAvatar,
        role: user.role,
      },
    })
  }

  // fetch discord presence for a set of discord ids
  async presence({ request, response }: HttpContext) {
    const idsParam = request.input('ids', '')
    const ids = String(idsParam).split(',').map((id) => id.trim()).filter(Boolean)

    if (ids.length === 0) {
      return response.ok({ data: {} })
    }

    const presenceMap: Record<string, 'online' | 'idle' | 'dnd' | 'offline'> = {}

    // check lanyard or fallback gracefully
    await Promise.all(
      ids.slice(0, 20).map(async (discordId) => {
        try {
          const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`, {
            signal: AbortSignal.timeout(2000),
          })
          if (res.ok) {
            const data: any = await res.json()
            if (data.success && data.data) {
              const status = data.data.discord_status || 'offline'
              presenceMap[discordId] = status
              return
            }
          }
        } catch {}
        // fallback status
        presenceMap[discordId] = 'offline'
      })
    )

    return response.ok({ data: presenceMap })
  }
}
