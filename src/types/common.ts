import { SelectChangeEvent } from '@mui/material'
import { ChangeEvent, ReactNode } from 'react'
import { UserType } from './user'
import { GridFieldTypes } from '../consts/common'
import { Dayjs } from 'dayjs'

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

export interface EntityDialogProps {
  title: string
  isOpen: boolean
  onClose: () => void
  entityAction: () => void
  moduleOption: ModulesOptions
}

export interface BasicTabProps {
  tabs: Record<string, ReactNode>
}

export interface GridFieldAttributes {
  id?: string | number
  value?: string | number
  type: GridFieldType
  link?: string
  options?: (string | number | undefined)[]
  optionsValues?: (string | number | undefined)[]
  required?: boolean
  autocompleteMap?: AutocompleteHashMap
  handleClick?: (id: number) => void
}

export interface PageElement {
  [key: string]: GridFieldAttributes
}

export interface TableProps {
  columns: GridLabel[]
  rows: PageElement[]
  rowPerPage: number
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

export type AutocompleteHashMap = {
  [key: string | number]: unknown
}

export type AutocompleteEntity = {
  [key: string]: unknown
}

export interface GridFieldProps {
  gridFieldData: GridFieldAttributes
  label: GridLabel
  handleChange?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => void
  handleChangeDateTimePicker?: (value: Dayjs | null, name: string) => void
}

export interface DetailPageGridFieldProps {
  gridFieldData: GridFieldAttributes
  label: GridLabel
}

export interface ExpandableTypographyTableProps {
  title: string
  hideActionSection: boolean
  moduleOption: ModulesOptions
  expandableDialogAction: () => void
  isLoading: boolean
  columns: GridLabel[]
  rows: PageElement[]
}
