export type ThemeType = 'light' | 'dark'

export type ProfileType = {
  id: string
  bio: string
  profilePicture: string
  theme: ThemeType
  marketingPreference: boolean
}

export type getProfileRequestType = {
  id: number
}

export type requestTypes = {
  getProfile?: {
    id: number
  }
  createProfile?: {
    bio?: string
    profilePicture?: string
    theme?: ThemeType
    marketingPreference?: boolean
  }
  updateProfile?: {
    id: string
    bio: string
    profilePicture: string
    theme: ThemeType
    marketingPreference: boolean
  }
}
