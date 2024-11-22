import { AuthState } from '../types/auth'

export const getRoutePrefixFromCodeString = (prefixText: string): string => {
  return prefixText
    .split(/(?=[A-Z])/)
    .map((elem) => elem.toLowerCase())
    .join('-')
}

export const getCurrentUser = (): AuthState => {
  return JSON.parse(String(localStorage.getItem('currentUser'))) as AuthState
}
