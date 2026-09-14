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

// Hardcoded admin Discord IDs for automated administrator elevation
export const HARDCODED_ADMIN_DISCORD_IDS: readonly string[] = [
  '215537065863938049',
  '212401207694721024',
  '965511204372086814',
  '364539598942240768',
]

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
      const errText = await response.text()
      console.error('Discord token exchange failed:', response.status, errText)
      throw new Error(`failed to exchange code: ${errText}`)
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
    // combine hardcoded admin list with any from env
    const envAdminIds = ((env.get('ADMIN_DISCORD_IDS') as string) || '').split(',').map(s => s.trim()).filter(Boolean)
    const adminIds = new Set([...HARDCODED_ADMIN_DISCORD_IDS, ...envAdminIds])

    const supervisorIds = ((env.get('SUPERVISOR_DISCORD_IDS') as string) || '').split(',').map(s => s.trim()).filter(Boolean)
    const modIds = ((env.get('MODERATOR_DISCORD_IDS') as string) || '').split(',').map(s => s.trim()).filter(Boolean)
    const seniorIds = ((env.get('SENIOR_DISCORD_IDS') as string) || '').split(',').map(s => s.trim()).filter(Boolean)

    let role = 'voter'
    if (adminIds.has(profile.id)) {
      role = 'admin'
    } else if (supervisorIds.includes(profile.id) || modIds.includes(profile.id)) {
      role = 'supervisor'
    } else if (seniorIds.includes(profile.id)) {
      role = 'senior_contributor'
    }

    // if user already exists, preserve their role unless admin list assigns higher role
    const existing = await User.findBy('discordId', profile.id)
    if (existing && role === 'voter') {
      role = existing.role
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
