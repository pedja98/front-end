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

export interface BasicTabProps {
  tabs: Record<string, ReactNode>
}

type EnumValue<T extends Record<string, string | number>> = T[keyof T]

export interface GridFieldAttributes<TEnum extends Record<string, string | number> = Record<string, string>> {
  id?: string | number
  value?: string | number
  type: GridFieldType
  link?: string
  options?: (string | number | undefined)[]
  optionsValues?: (string | number | undefined)[]
  required?: boolean
  autocompleteMap?: AutocompleteHashMap
  dialogField?: boolean
  disabled?: boolean
  handleClick?: (id: number) => void
  multiselectValue?: string[]
  multiselectOptions?: Record<EnumValue<TEnum>, string>
  multiselectOptionValues?: TEnum
}

export interface PageElement {
  [key: string]: GridFieldAttributes
}

export interface TableProps {
  columns: GridLabel[]
  rows: PageElement[]
  rowPerPage?: number
  printing?: boolean
}

export interface GridLabel {
  text: string
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
  moduleOption: ModuleOptions
  sortByFields: Record<string, string>
  sortByValue?: string
  sortOrder?: string
  handleChange: (event: SelectChangeEvent<string>) => void
}

export enum ModuleOptions {
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
  Reports = 'reports',
  Users = 'users',
  Logout = 'logout',
}

export enum EntityConfirmationDialogOptions {
  CompanyContactRelationCreateDialog = 'CompanyContactRelationCreateDialog',
  CompanyContactRelationUpdateDialog = 'CompanyContactRelationUpdateDialog',
  UploadContractDocument = 'UploadContractDocument',
  SignContractDialog = 'SignContractDialog',
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
  handleChange?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => void
  handleChangeDateTimePicker?: (value: Dayjs | null, name: string) => void
}

export interface DetailPageGridFieldProps {
  gridFieldData: GridFieldAttributes
  label: GridLabel
}

export interface ExpandableTypographyTableProps {
  title: string
  hideActionSection: boolean
  expandableDialogAction?: () => void
  isLoading: boolean
  columns: GridLabel[]
  rows: PageElement[]
  actionText?: string
}

export interface NavbarFadeMenuProps {
  menuOptions: ModuleOptions[]
  mainComponentText: string
}
