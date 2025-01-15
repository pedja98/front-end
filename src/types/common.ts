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
  value?: string
  type: GridFieldType
  link?: string
  options?: string[]
}

export interface ViewElement {
  [key: string]: GridFieldAttributes
}

export interface TableColumn {
  label: string
  key: string
}

export interface TableProps {
  columns: TableColumn[]
  rows: ViewElement[]
  emptyValue?: string
}

export interface ViewLabel {
  label: string
  key: string
  skip?: boolean
}

export interface CommonState {
  entityIsDeleted?: boolean
}
