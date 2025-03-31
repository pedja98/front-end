import { EntityConfirmationDialogOptions } from './common'

export interface ConfirmState {
  open?: boolean
  confirmationText?: string
  confirmationTitle?: string
  confirmButtonLabel?: string
  denyButtonLabel?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
  customConfirmComponentCode?: EntityConfirmationDialogOptions
  customConfirmComponentAttributes?: Record<string, unknown>
}
