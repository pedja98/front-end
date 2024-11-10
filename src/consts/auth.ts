import { AuthState } from '../types/auth'
import { Languages } from './common'

export const InitialState: AuthState = {
  username: undefined,
  type: undefined,
  language: Languages.SR,
}
