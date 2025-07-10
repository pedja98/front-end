import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const ReportPage = () => {
  const { t } = useTranslation()

  return (
    <Grid>
      <Typography variant='h4'>{t('pageNamesAndActions.reports')}</Typography>
    </Grid>
  )
}

export default ReportPage
