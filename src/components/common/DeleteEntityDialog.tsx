import { FC } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface DeleteEntityDialogProps {
  open: boolean
  additionalText: string
  onConfirm: () => void
  onCancel: () => void
}

const DeleteEntityDialog: FC<DeleteEntityDialogProps> = ({ open, additionalText, onConfirm, onCancel }) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby='delete-entity-dialog-title'>
      <DialogTitle id='delete-entity-dialog-title'>{t('general:confirmDeletionTitle')}</DialogTitle>
      <DialogContent>
        <Typography>{t('general:deleteConfirmationMessage', { additionalText })}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color='error'>
          {t('dialogConfirmationButtonLabels.yes')}
        </Button>
        <Button onClick={onCancel} color='primary'>
          {t('dialogConfirmationButtonLabels.no')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteEntityDialog
