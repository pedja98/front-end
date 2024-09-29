import { UserTypes } from './user'

export interface SignInRequest {
  username: string
  password: string
}

export interface SignInResponse {
  token: string
  type: UserTypes
}

export interface AuthState {
  token: string | null
  userType: UserTypes | undefined
  isAuthenticated: boolean
  error: string | null
}
