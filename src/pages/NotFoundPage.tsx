import { Button, Typography } from '@mui/material'
import { Root } from '../styles/common'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Root>
      <Typography variant='h1'>{t('general:pageNotFound')}</Typography>
      <Button variant='contained' color='primary' onClick={handleGoBack} sx={{ marginTop: 2 }}>
        {t('general:backToPreviousPage')}
      </Button>
    </Root>
  )
}

export default NotFoundPage
