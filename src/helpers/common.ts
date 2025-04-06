import { InitialState as AuthInitialState } from '../consts/auth'
import { AuthState } from '../types/auth'
import Cookies from 'js-cookie'
import { AutocompleteHashMap, AutocompleteEntity, ModuleOptions } from '../types/common'
import { TFunction } from 'i18next'

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
  return date.toLocaleString('en-GB', { hour12: false })
}

export const getAutocompleteHashMapFromEntityData = <T extends AutocompleteEntity>(
  entities: T[],
  keyField: string,
  valueField: string,
): AutocompleteHashMap => {
  return entities.reduce((acc, entity) => {
    const entityKey = String(entity[keyField])
    const entityValue = entity[valueField]
    if (entityKey && entityValue) {
      acc[entityKey] = entityValue
    }
    return acc
  }, {} as AutocompleteHashMap)
}

export const canCreateModule = (entityName: ModuleOptions): boolean => {
  return ![ModuleOptions.Opportunities, ModuleOptions.Contracts, ModuleOptions.Offers].includes(entityName)
}

export const getEnumTranslations = <T extends string>(
  enumObj: Record<string, T>,
  t: TFunction,
  translationPrefix: string,
): Record<T, string> => {
  return Object.values(enumObj).reduce(
    (acc, key) => {
      const translationKey = `${translationPrefix}.${key.toLowerCase()}`
      acc[key] = t(translationKey)
      return acc
    },
    {} as Record<T, string>,
  )
}
