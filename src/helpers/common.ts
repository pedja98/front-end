import { InitialState as AuthInitialState } from '../consts/auth'
import { AuthState } from '../types/auth'
import Cookies from 'js-cookie'

export const getRoutePrefixFromCodeString = (prefixText: string): string => {
  return prefixText
    .split(/(?=[A-Z])/)
    .map((elem) => elem.toLowerCase())
    .join('-')
}

export const getCamelCaseFromKebabString = (kebabText: string): string => {
  return kebabText
    .split('-')
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('')
}

export const getCurrentUser = (): AuthState => {
  const cookie = Cookies.get('currentUser')
  return cookie ? (JSON.parse(cookie) as AuthState) : AuthInitialState
}

export const createQueryParamsForSearch = (searchData: Record<string, unknown>): string => {
  const searchKeys = Object.keys(searchData)
  if (!searchKeys.length) {
    return ''
  }
  let queryParams = '?'
  searchKeys.forEach((key, index) => {
    queryParams += key + '=' + String(searchData[key])
    if (index !== searchKeys.length - 1) {
      queryParams += '&'
    }
  })
  return queryParams
}
