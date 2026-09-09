import { HttpContext } from '@adonisjs/core/http'
import DiscordAuthService from '#services/discord_auth_service'
import User from '#models/user'

export default class AuthController {
  async callback({ request, response }: HttpContext) {
    const code = request.input('code')
    if (!code) {
      return response.badRequest({ error: { code: 'MISSING_CODE', message: 'Discord auth code is missing' } })
    }

    const discordAuthService = new DiscordAuthService()
    const tokenResult = await discordAuthService.exchangeCode(code)
    const profile = await discordAuthService.fetchProfile(tokenResult.accessToken)
    const user = await discordAuthService.findOrCreateUser(profile)

    // using accessTokens provider
    const token = await User.accessTokens.create(user)

    return {
      data: {
        token: token.value!.release(),
        user: {
          id: user.id,
          discordUsername: user.discordUsername,
          role: user.role
        }
      }
    }
  }

  async me({ auth }: HttpContext) {
    const user = auth.user!
    return {
      data: {
        id: user.id,
        discordId: user.discordId,
        discordUsername: user.discordUsername,
        discordAvatar: user.discordAvatar,
        role: user.role
      }
    }
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken!.identifier)
    return {
      data: { message: 'logged out' }
    }
  }
}
