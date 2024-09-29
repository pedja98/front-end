import { AuthState } from '../types/auth'

export const InitialState: AuthState = {
  token: null,
  userType: undefined,
  isAuthenticated: false,
  error: null,
}
