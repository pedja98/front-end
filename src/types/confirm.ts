export interface ConfirmProps {
  open: boolean
  confirmationText: string
  confirmationTitle: string
  onConfirm: () => void
  onCancel: () => void
}
