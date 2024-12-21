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

export interface BasicTabProps {
  tabs: Record<string, ReactNode>
}
