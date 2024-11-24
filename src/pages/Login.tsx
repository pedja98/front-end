import { Card, SelectChangeEvent, Typography } from '@mui/material'
import {
  FormButtonStyled,
  FormCartActionStyled,
  FormCartContextStyled,
  FormTextFieldStyled,
  Root,
  StyledCenterBackgroundContainer,
} from '../styles/common'
import { ChangeEvent, useState } from 'react'
import { AuthRequest } from '../types/auth'
import { useLoginMutation } from '../app/apis/gw.api'
import { useAppDispatch } from '../app/hooks'
import { setNotification } from '../features/notifications.slice'
import { NotificationTypeEnum } from '../types/notification'
import { ApiException } from '../types/exception'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [loginRequest, setLoginRequest] = useState<AuthRequest>({
    username: '',
    password: '',
  })
  const [login] = useLoginMutation()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleChange =
    (field: keyof typeof loginRequest) =>
    (event: SelectChangeEvent<unknown> | ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setLoginRequest({ ...loginRequest, [field]: event.target.value as string })
    }

  const handleLogin = async () => {
    try {
      if (!loginRequest.username || !loginRequest.password) {
        dispatch(
          setNotification({
            text: t('general:fillAllFields'),
            type: NotificationTypeEnum.Error,
          }),
        )
        return
      }
      await login(loginRequest).unwrap()
      navigate('/index')
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `login:${errorResponse.data?.error}` || 'general:unknowError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationTypeEnum.Error,
        }),
      )
    }
  }

  return (
    <StyledCenterBackgroundContainer>
      <Card
        variant='outlined'
        sx={{
          maxWidth: 310,
          height: 345,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '3%%',
        }}
      >
        <FormCartContextStyled>
          <Root>
            <Typography variant='h5'>{t('login:welcome')}</Typography>
          </Root>
          <FormTextFieldStyled
            id='username'
            label={t('login:username')}
            value={loginRequest.username}
            onChange={handleChange('username')}
            sx={{ m: 1 }}
          />
          <FormTextFieldStyled
            id='password'
            label={t('login:password')}
            type='password'
            value={loginRequest.password}
            onChange={handleChange('password')}
            sx={{ m: 1 }}
          />
        </FormCartContextStyled>
        <FormCartActionStyled>
          <FormButtonStyled sx={{ m: 1 }} onClick={handleLogin}>
            {t('login:loginButtonText')}
          </FormButtonStyled>
        </FormCartActionStyled>
      </Card>
    </StyledCenterBackgroundContainer>
  )
}

export default Login
