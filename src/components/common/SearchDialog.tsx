import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SearchDialogProps } from '../../types/common'
import { useLocation } from 'react-router-dom'
import { getCamelCaseFromKebabString } from '../../helpers/common'
import { ModulesOptions } from '../../types/navbar'
import UserSearchDialog from '../user/UserSearchDialog'
import React from 'react'

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const { t } = useTranslation()
  const location = useLocation()
  const currentModule = getCamelCaseFromKebabString(location.pathname.split('/')[2]) as ModulesOptions

  let dialogContent: React.ReactNode

  switch (currentModule) {
    case ModulesOptions.UserManagment:
      dialogContent = <UserSearchDialog />
      break
    default:
      dialogContent = <div>{t('general:noSearchContent')}</div>
      break
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{t('general:searchDialogTitle')}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          {t('general:close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SearchDialog
