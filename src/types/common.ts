import { ReactNode } from 'react'
import { UserType } from './user'

export type Language = 'SR' | 'EN'

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

export interface TableLink {
  value: string
  link: string
}

export interface ViewElement {
  [key: string]: string | number | undefined | null | TableLink
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
