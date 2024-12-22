import { InitialState as AuthInitialState } from '../consts/auth'
import { AuthState } from '../types/auth'
import Cookies from 'js-cookie'

export const getRoutePrefixFromCodeString = (prefixText: string): string => {
  return prefixText
    .split(/(?=[A-Z])/)
    .map((elem) => elem.toLowerCase())
    .join('-')
}

export const getCurrentUser = (): AuthState => {
  const cookie = Cookies.get('currentUser')
  return cookie ? (JSON.parse(cookie) as AuthState) : AuthInitialState
}
