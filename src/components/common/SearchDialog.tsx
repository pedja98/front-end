import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SearchDialogProps } from '../../types/common'
import { useLocation } from 'react-router-dom'
import { createQueryParamsForSearch, getCamelCaseFromKebabString } from '../../helpers/common'
import { ModulesOptions } from '../../types/navbar'
import UserSearchDialog from '../user/UserSearchDialog'
import React, { useState } from 'react'
import { Root } from '../../styles/common'
import { useAppSelector } from '../../app/hooks'
import { useGetUsersQuery } from '../../app/apis/crm.api'

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const { t } = useTranslation()
  const location = useLocation()
  const currentModule = getCamelCaseFromKebabString(location.pathname.split('/')[2]) as ModulesOptions

  const [queryParams, setQueryParams] = useState<string>('')
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false)

  const searchData = useAppSelector((state) => state.search)

  useGetUsersQuery(queryParams, {
    skip: !triggerSearch,
  })

  let dialogContent: React.ReactNode

  switch (currentModule) {
    case ModulesOptions.UserManagment:
      dialogContent = <UserSearchDialog />
      break
    default:
      dialogContent = <div>{t('general:noSearchContent')}</div>
      break
  }

  const handleSearch = () => {
    setQueryParams(createQueryParamsForSearch(searchData))
    setTriggerSearch(true)
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
