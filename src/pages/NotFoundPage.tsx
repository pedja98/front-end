import { Typography } from '@mui/material'
import { ButtonStyled, Root } from '../styles/common'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { Languages } from '../consts/user'

const NotFoundPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const language = useAppSelector((state) => state.auth).language || Languages.SR

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Root>
      <Typography variant='h1'>{t('general:pageNotFound', { lng: language })}</Typography>
      <ButtonStyled variant='contained' color='primary' onClick={handleGoBack} sx={{ marginTop: 2 }}>
        {t('general:backToPreviousPage', { lng: language })}
      </ButtonStyled>
    </Root>
  )
}

export default NotFoundPage
