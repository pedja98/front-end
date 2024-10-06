import { UserTypes } from './user'

export interface AuthRequest {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  type: UserTypes
}

export interface AuthState {
  token: string | null
  userType: UserTypes | undefined
  isAuthenticated: boolean
  error: string | null
}
