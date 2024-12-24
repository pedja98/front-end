import { Button, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SearchDialog from '../components/common/SearchDialog'

const EntityIndex = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const [isDialogOpen, setDialogOpen] = useState(false)

  const handleNavigateToCreatePage = () => {
    navigate(`${location.pathname}/create`)
  }

  const handleOpenDialog = () => {
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  return (
    <>
      <Grid container direction='row' spacing={2}>
        <Grid item sx={{ ml: 1 }}>
          <Button variant='contained' color='primary' sx={{ marginTop: 2 }} onClick={handleNavigateToCreatePage}>
            {t('general:create')}
          </Button>
        </Grid>
        <Grid item>
          <Button variant='contained' color='primary' sx={{ marginTop: 2 }} onClick={handleOpenDialog}>
            {t('general:search')}
          </Button>
        </Grid>
      </Grid>

      <SearchDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  )
}

export default EntityIndex
