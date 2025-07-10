import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../app/hooks'
import { Languages } from '../consts/user'

const HomePage = () => {
  const { t } = useTranslation()
  const language = useAppSelector((state) => state.auth).language || Languages.SR

  return (
    <Grid>
      <Typography variant='h4'>{t('pageNamesAndActions.home', { lng: language.toLowerCase() })}</Typography>
    </Grid>
  )
}

export default HomePage
