import { Button, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

const EntityIndex = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigateToCreatePage = () => {
    navigate(`${location.pathname}/create`)
  }

  return (
    <Grid container direction='row' spacing={2}>
      <Grid item sx={{ ml: 1 }}>
        <Button variant='contained' color='primary' sx={{ marginTop: 2 }} onClick={handleNavigateToCreatePage}>
          {t('general:create')}
        </Button>
      </Grid>
      <Grid item>
        <Button variant='contained' color='primary' sx={{ marginTop: 2 }}>
          {t('general:search')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default EntityIndex
