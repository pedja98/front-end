import { Button, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SearchDialog from '../components/SearchDialog'
import { useAppDispatch } from '../app/hooks'
import { cleanSearch } from '../features/search.slice'
import { canCreateModule, getCamelCaseFromKebabString } from '../helpers/common'
import { cleanCommonState } from '../features/common.slice'
import { ModuleOptions } from '../types/common'

const EntityIndexPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const [isDialogOpen, setDialogOpen] = useState(false)

  const entityName = String(location.pathname.split('/').pop()) as ModuleOptions

  useEffect(() => {
    dispatch(cleanCommonState())
  }, [])

  const handleNavigateToCreatePage = () => {
    navigate(`${location.pathname}/create`)
  }

  const handleOpenDialog = () => {
    dispatch(cleanSearch())
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  return (
    <Grid container sx={{ ml: 1, mt: 1 }}>
      <Grid item>
        <Typography variant='h4'>
          {t(`pageNamesAndActions.${getCamelCaseFromKebabString(entityName)}`).toLocaleUpperCase()}
        </Typography>
      </Grid>
      <Grid container direction='row' spacing={2}>
        {canCreateModule(entityName) && (
          <Grid item>
            <Button variant='contained' color='primary' sx={{ marginTop: 2 }} onClick={handleNavigateToCreatePage}>
              {t('general:create')}
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button variant='contained' color='primary' sx={{ marginTop: 2 }} onClick={handleOpenDialog}>
            {t('general:search')}
          </Button>
        </Grid>
      </Grid>

      <SearchDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </Grid>
  )
}

export default EntityIndexPage
