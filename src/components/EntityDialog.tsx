import { useTranslation } from 'react-i18next'
import { EntityDialogProps } from '../types/common'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { Root } from '../styles/common'
import { ReactNode } from 'react'
import { getEntityDialog } from '../transformers/dialog'

const EntityDialog = ({ isOpen, onClose, moduleOption, title, entityAction }: EntityDialogProps) => {
  const { t } = useTranslation()

  const dialogContent: ReactNode = getEntityDialog(moduleOption) || <Grid>{t('noContent')}</Grid>

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: { width: '500px', maxWidth: '90%' },
      }}
    >
      <DialogTitle>
        <Root>
          <Typography variant='h4'>{title}</Typography>
        </Root>
      </DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions
        sx={{
          width: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Button sx={{ width: '35%' }} onClick={entityAction} color='primary'>
          {t('general:create')}
        </Button>
        <Button sx={{ width: '35%' }} onClick={onClose} color='primary'>
          {t('general:close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EntityDialog
