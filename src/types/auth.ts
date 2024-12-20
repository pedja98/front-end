import { Language } from './common'
import { UserTypes } from './user'

export interface AuthRequest {
  username: string
  password: string
}

export interface AuthResponse {
  username: string | undefined | null
  type: UserTypes | undefined | null
  language: Language
}

export interface AuthState {
  username: string | undefined | null
  type: UserTypes | undefined | null
  language: Language
}

export interface ChangePasswordRequest {
  username: string
  oldPassword: string
  newPassword: string
}

export interface ChangePasswordFormProps {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}
