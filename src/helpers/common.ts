import { InitialState as AuthInitialState } from '../consts/auth'
import { AuthState } from '../types/auth'
import Cookies from 'js-cookie'
import { ViewLink, ViewSelect } from '../types/common'

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

export const dateFormater = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = date.getUTCFullYear()
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export const isViewLink = (obj: unknown): obj is ViewLink =>
  typeof obj === 'object' &&
  obj !== null &&
  'value' in obj &&
  'link' in obj &&
  typeof (obj as Record<string, unknown>).value === 'string' &&
  typeof (obj as Record<string, unknown>).link === 'string'

export function isViewSelect(obj: unknown): obj is ViewSelect {
  if (typeof obj === 'object' && obj !== null) {
    const viewSelect = obj as Record<string, unknown>
    return (
      typeof viewSelect.currentValue === 'string' &&
      Array.isArray(viewSelect.options) &&
      viewSelect.options.every((option) => typeof option === 'string')
    )
  }
  return false
}
