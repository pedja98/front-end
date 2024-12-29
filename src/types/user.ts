import { Language } from './common'

export enum UserType {
  ADMIN = 'ADMIN',
  SALESMAN = 'SALESMAN',
  L1_MANAGER = 'L1_MANAGER',
  L2_MANAGER = 'L2_MANAGER',
  L3_MANAGER = 'L3_MANAGER',
}

export interface FetchUserResponse {
  firstName?: string
  lastName?: string
  email?: string
  username?: string
  phone?: string
  type?: UserType
  language?: Language
  shopId?: number
  shopName?: string
  salesmen?: string
  createdById?: number
  createdByUsername?: string
  modifiedById?: number
  modifiedByUsername?: string
  dateCreated?: Date
  dateModified?: Date
}

export interface UserState {
  firstName?: string
  lastName?: string
  email?: string
  username?: string
  phone?: string
  type?: UserType
  language?: Language
  shopId?: number
  shopName?: string
  salesmen?: string
  createdById?: number
  createdByUsername?: string
  modifiedById?: number
  modifiedByUsername?: string
  dateCreated?: Date
  dateModified?: Date
}
export interface CreateUserDto {
  firstName?: string
  lastName?: string
  email?: string
  username?: string
  password: string
  phone?: string
  type?: UserType
  language?: Language
}

export interface CreateUserDataFormProps {
  firstName: string
  lastName: string
  username: string
  password: string
  confirm: string
  email: string
  phone: string
  type: string
  language: string
}

export interface SearchUserDataFormProps {
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  phone?: string
  type?: string[]
}

export interface User {
  firstName: string
  lastName: string
  email: string
  username: string
  phone: string
  type: UserType
  language: Language
  shopId: number
  shopName: string
  salesmen: string
  createdById: number
  createdByUsername: string
  modifiedById: number
  modifiedByUsername: string
  dateCreated: string
  dateModified: string
}
