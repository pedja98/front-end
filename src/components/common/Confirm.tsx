import { FC } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { hideConfirm, selectConfirm } from '../../features/confirm.slice'

const Confirm: FC = () => {
  const dispatch = useDispatch()
  const confirmState = useSelector(selectConfirm)

  const handleConfirm = () => {
    if (confirmState.onConfirm) {
      confirmState.onConfirm()
    }
    dispatch(hideConfirm())
  }

  const handleCancel = () => {
    if (confirmState.onCancel) {
      confirmState.onCancel()
    }
    dispatch(hideConfirm())
  }

  return (
    <Dialog open={!!confirmState.open} onClose={handleCancel} aria-labelledby='confirmation-title'>
      <DialogTitle id='confirmation-title'>{confirmState.confirmationTitle}</DialogTitle>
      <DialogContent>
        <Typography>{confirmState.confirmationText}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color='primary'>
          {confirmState.confirmButtonLabel}
        </Button>
        <Button onClick={handleCancel} color='error'>
          {confirmState.denyButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirm
