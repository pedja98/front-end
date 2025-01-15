import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SearchDialogProps } from '../../types/common'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCamelCaseFromKebabString } from '../../helpers/common'
import { ModulesOptions } from '../../types/navbar'
import UserSearchDialog from '../user/UserSearchDialog'
import { ReactNode } from 'react'
import { Root } from '../../styles/common'
import RegionSearchDialog from '../region/RegionSearchDialog'

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const currentModule = getCamelCaseFromKebabString(location.pathname.split('/')[2]) as ModulesOptions

  let dialogContent: ReactNode

  switch (currentModule) {
    case ModulesOptions.UserManagement:
      dialogContent = <UserSearchDialog />
      break
    case ModulesOptions.Regions:
      dialogContent = <RegionSearchDialog />
      break
    default:
      dialogContent = <div>{t('general:noSearchContent')}</div>
      break
  }

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
          <Typography variant='h4'>{t('general:searchDialogTitle')}</Typography>
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
        <Button sx={{ width: '35%' }} onClick={handleSearch} color='primary'>
          {t('general:search')}
        </Button>
        <Button sx={{ width: '35%' }} onClick={onClose} color='primary'>
          {t('general:close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SearchDialog
