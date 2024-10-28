import { UserTypes } from './user'

export interface AuthRequest {
  username: string
  password: string
}

export interface AuthResponse {
  username: string | undefined | null
  type: UserTypes | undefined | null
}

export interface AuthState {
  username: string | undefined | null
  type: UserTypes | undefined | null
}
