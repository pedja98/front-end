import { SelectChangeEvent } from '@mui/material'
import { ReactNode } from 'react'
import { UserType } from './user'
import { GridFieldTypes } from '../consts/common'

export type Language = 'SR' | 'EN'

export type GridFieldType = (typeof GridFieldTypes)[keyof typeof GridFieldTypes]

export interface UpdateAttributePayload {
  attribute: string
  value?: number | string | UserType | Language | Date
}

export interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

export interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

export interface BasicTabProps {
  tabs: Record<string, ReactNode>
}

export interface GridFieldAttributes {
  value?: string | number
  type: GridFieldType
  link?: string
  options?: (string | number | undefined)[]
  optionsValues?: (string | number | undefined)[]
  required?: boolean
}

export interface PageElement {
  [key: string]: GridFieldAttributes
}

export interface TableColumn {
  label: string
  key: string
}

export interface TableProps {
  columns: TableColumn[]
  rows: PageElement[]
  emptyValue?: string
}

export interface GridLabel {
  label: string
  key: string
}

export interface CommonState {
  entityIsDeleted?: boolean
}
export interface ApiException {
  status: number
  message: string
  error: string
}

export interface SearchDialogSortProps {
  moduleOption: ModulesOptions
  sortByFields: Record<string, string>
  sortByValue?: string
  sortOrder?: string
  handleChange: (event: SelectChangeEvent<string>) => void
}

export enum ModulesOptions {
  Home = 'home',
  Companies = 'companies',
  Contacts = 'contacts',
  CustomerSessions = 'customerSessions',
  Opportunities = 'opportunities',
  Offers = 'offers',
  Contracts = 'contracts',
  Shops = 'shops',
  EditProfile = 'editProfile',
  Catalogue = 'catalogue',
  Regions = 'regions',
  Users = 'users',
  Logout = 'logout',
}
