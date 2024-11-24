import { Language } from './common'

export enum UserTypes {
  ADMIN,
  SALESMAN,
  MANAGER,
}

export interface FetchUserResponse {
  firstName?: string
  lastName?: string
  email?: string
  username?: string
  phone?: string
  type?: UserTypes
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
  type?: UserTypes
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
