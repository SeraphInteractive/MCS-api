import { HttpContext } from '@adonisjs/core/http'
import DiscordAuthService from '#services/discord_auth_service'
import User from '#models/user'

import env from '#start/env'

export default class AuthController {
  async redirect({ response }: HttpContext) {
    const clientId = env.get('DISCORD_CLIENT_ID') as string
    const redirectUri = encodeURIComponent((env.get('DISCORD_REDIRECT_URI') as string) || '')
    const scope = encodeURIComponent('identify')
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`
    return response.redirect(discordAuthUrl)
  }

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
    const tokenStr = token.value!.release()

    // check if this is a direct browser navigation, if so redirect back to frontend with token
    let origin = (env.get('CORS_ORIGIN') || 'http://localhost:5173').split(',')[0].trim()
    if (!origin || origin === '*' || !origin.startsWith('http')) {
      origin = 'http://localhost:5173'
    }
    const accept = request.header('accept') || ''
    if (accept.includes('text/html') || !request.header('x-requested-with')) {
      return response.redirect(`${origin}/?token=${tokenStr}`)
    }

    return {
      data: {
        token: tokenStr,
        user: {
          id: user.id,
          discordUsername: user.discordUsername,
          role: user.role,
        },
      },
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
