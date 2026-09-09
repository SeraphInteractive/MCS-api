import env from '#start/env'
import User from '#models/user'

interface DiscordTokenResponse {
  access_token: string
  token_type: string
}

interface DiscordUserProfile {
  id: string
  username: string
  avatar: string | null
}

export class DiscordAuthService {
  async exchangeCode(code: string): Promise<{ accessToken: string; tokenType: string }> {
    // hit the discord api to get our token
    const response = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: env.get('DISCORD_CLIENT_ID') as string,
        client_secret: env.get('DISCORD_CLIENT_SECRET') as string,
        grant_type: 'authorization_code',
        code,
        redirect_uri: env.get('DISCORD_REDIRECT_URI') as string,
      }),
    })

    if (!response.ok) {
      throw new Error('failed to exchange code')
    }

    const data = (await response.json()) as DiscordTokenResponse
    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
    }
  }

  async fetchProfile(accessToken: string): Promise<DiscordUserProfile> {
    // grab the user profile info
    const response = await fetch('https://discord.com/api/v10/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!response.ok) {
      throw new Error('failed to fetch profile')
    }

    return (await response.json()) as DiscordUserProfile
  }

  async findOrCreateUser(profile: DiscordUserProfile): Promise<User> {
    // check env arrays to see if they get special roles
    const adminIds = ((env.get('ADMIN_DISCORD_IDS') as string) || '').split(',')
    const modIds = ((env.get('MODERATOR_DISCORD_IDS') as string) || '').split(',')

    let role = 'voter'
    if (adminIds.includes(profile.id)) {
      role = 'admin'
    } else if (modIds.includes(profile.id)) {
      role = 'moderator'
    }

    // update if they exist or create a new row
    return await User.updateOrCreate(
      { discordId: profile.id },
      {
        discordUsername: profile.username,
        discordAvatar: profile.avatar,
        role,
      }
    )
  }
}

export default DiscordAuthService
