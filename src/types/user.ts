import { Language } from './common'

export enum UserType {
  ADMIN = 'ADMIN',
  SALESMAN = 'SALESMAN',
  L1_MANAGER = 'L1_MANAGER',
  L2_MANAGER = 'L2_MANAGER',
}

export interface UserSearchFormProps {
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  phone?: string
  type?: string[]
  sortBy?: string
  sortOrder?: string
}

export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  username: string
  phone: string
  confirm: string
  type: UserType | ''
  language: Language
  shopId: number
  shopName: string
  salesmen: string
  createdByUsername: string
  modifiedByUsername: string
  dateCreated: string
  dateModified: string
}

export interface AssignedToUserData {
  id: number
  username: string
}
