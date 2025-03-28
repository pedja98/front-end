import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SearchDialogProps } from '../types/common'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCamelCaseFromKebabString } from '../helpers/common'
import { ModulesOptions } from '../types/common'
import { ReactNode } from 'react'
import { Root } from '../styles/common'
import { getSearchDialog } from '../transformers/dialog'

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const entityName = getCamelCaseFromKebabString(location.pathname.split('/')[2]) as ModulesOptions

  const searchDialog = getSearchDialog(entityName)
  const dialogContent: ReactNode = searchDialog || (
    <Grid>
      <Typography variant='h5'>{t('noContent')}</Typography>
    </Grid>
  )

  const handleSearch = () => {
    navigate(`${location.pathname}/list`)
  }

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
          <Typography variant='h4'>
            {t('general:searchDialogTitle').toUpperCase() +
              ' ' +
              t(`pageNamesAndActions.${getCamelCaseFromKebabString(entityName)}`).toLocaleUpperCase()}
          </Typography>
        </Root>
      </DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      {!!searchDialog && (
        <DialogActions
          sx={{
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Button sx={{ width: '35%' }} onClick={handleSearch} color='primary'>
            {t('general:search')}
          </Button>
          <Button sx={{ width: '35%' }} onClick={onClose} color='primary'>
            {t('general:close')}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default SearchDialog
