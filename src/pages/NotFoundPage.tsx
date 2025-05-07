import { Typography } from '@mui/material'
import { ButtonStyled, Root } from '../styles/common'
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
      <ButtonStyled variant='contained' color='primary' onClick={handleGoBack} sx={{ marginTop: 2 }}>
        {t('general:backToPreviousPage')}
      </ButtonStyled>
    </Root>
  )
}

export default NotFoundPage
