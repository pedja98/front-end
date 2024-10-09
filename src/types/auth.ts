import { UserTypes } from './user'

export interface AuthRequest {
  username: string
  password: string
}

export interface AuthResponse {
  token: string | undefined | null
  type: UserTypes | undefined | null
}

export interface AuthState {
  token: string | undefined | null
  type: UserTypes | undefined | null
}
