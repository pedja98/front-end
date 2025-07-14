import { UserType } from './../types/user'
import { InitialState as AuthInitialState } from '../consts/auth'
import { AuthState } from '../types/auth'
import Cookies from 'js-cookie'
import { AutocompleteHashMap, AutocompleteEntity, ModuleOptions } from '../types/common'
import { TFunction } from 'i18next'
import * as CryptoJS from 'crypto-js'
import {
  NavbarFadeMenuAdminOptions,
  NavbarFadeMenuL2ManagerOptions,
  NavbarFadeMenuUserOptions,
  NavbarL1ManagerAndSalesmanLinks,
  NavbarL2ManagerAndAdminLinks,
} from '../consts/navbar'

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

export const createQueryParams = (data: object): string => {
  const entries = Object.entries(data)

  if (entries.length === 0) {
    return ''
  }

  const queryParams = entries
    .filter(([, value]) => value && (!Array.isArray(value) || value.length !== 0))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&')

  return `?${queryParams}`
}

export const dateFormatter = (dateString: string): string => {
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

export const canCreateModule = (entityName: ModuleOptions, userType?: UserType): boolean => {
  if (entityName === ModuleOptions.Shops) {
    return userType === UserType.ADMIN
  }
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

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = (error) => reject(error)
  })
}

export const hashPasswordForTransmission = (password: string): string => {
  return CryptoJS.AES.encrypt(password, String(process.env.REACT_APP_SECRET_AUTH_KEY)).toString()
}

export const getNavbarFadeMenuOptions = (userType: UserType): ModuleOptions[] => {
  switch (userType) {
    case UserType.ADMIN:
      return NavbarFadeMenuAdminOptions
    case UserType.L2_MANAGER:
      return NavbarFadeMenuL2ManagerOptions
    default:
      return NavbarFadeMenuUserOptions
  }
}

export const getNavbarMenuOptions = (userType: UserType): ModuleOptions[] => {
  switch (userType) {
    case UserType.ADMIN:
    case UserType.L2_MANAGER:
      return NavbarL2ManagerAndAdminLinks
    case UserType.L1_MANAGER:
    case UserType.SALESMAN:
      return NavbarL1ManagerAndSalesmanLinks
    default:
      return []
  }
}

export const createEnumMultiselectOptions = (
  enumObject: Record<string, string>,
  translationKey: string,
  t: TFunction,
) => {
  return Object.keys(enumObject).reduce(
    (acc, key) => {
      acc[key] = t(`${translationKey}.${key.toLowerCase()}`)
      return acc
    },
    {} as Record<string, string>,
  )
}

export const createMultiselectOptions = (data: { id: number; name: string }[]) => {
  return data.reduce(
    (acc, item) => {
      acc[String(item.id)] = item.name
      return acc
    },
    {} as Record<string, string>,
  )
}
