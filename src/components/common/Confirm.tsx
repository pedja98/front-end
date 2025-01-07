import { FC } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ConfirmProps } from '../../types/confirm'

const Confirm: FC<ConfirmProps> = ({ open, confirmationText, onConfirm, onCancel, confirmationTitle }) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby='confirmation-title'>
      <DialogTitle id='confirmation-title'>{confirmationTitle}</DialogTitle>
      <DialogContent>
        <Typography>{confirmationText}</Typography>
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

export default Confirm
