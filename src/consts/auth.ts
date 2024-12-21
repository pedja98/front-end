import { AuthState } from '../types/auth'
import { Languages } from './user'

export const InitialState: AuthState = {
  username: undefined,
  type: undefined,
  language: Languages.SR,
}
