import { Card, SelectChangeEvent, Typography } from '@mui/material'
import {
  FormButtonStyled,
  FormCartActionStyled,
  FormCartContextStyled,
  FormTextFieldStyled,
  Root,
  StyledCenterBackgroundContainer,
} from '../styles/common'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { AuthRequest } from '../types/auth'
import { useLoginMutation } from '../app/apis/core/gw.api'
import { useAppDispatch } from '../app/hooks'
import { setNotification } from '../features/notifications.slice'
import { NotificationType } from '../types/notification'
import { ApiException } from '../types/common'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [loginRequest, setLoginRequest] = useState<AuthRequest>({
    username: '',
    password: '',
  })
  const [login] = useLoginMutation()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const loginButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (loginButtonRef.current) {
      loginButtonRef.current.focus()
    }
  }, [])

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
            text: t('fillAllRequiredFields'),
            type: NotificationType.Error,
          }),
        )
        return
      }
      await login(loginRequest).unwrap()
      navigate('/index')
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `${errorResponse.data?.error}` || 'unknowError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
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
            <Typography variant='h5'>{t('welcome')}</Typography>
          </Root>
          <FormTextFieldStyled
            id='username'
            label={t('username')}
            value={loginRequest.username}
            onChange={handleChange('username')}
            sx={{ m: 1 }}
          />
          <FormTextFieldStyled
            id='password'
            label={t('password')}
            type='password'
            value={loginRequest.password}
            onChange={handleChange('password')}
            sx={{ m: 1 }}
          />
        </FormCartContextStyled>
        <FormCartActionStyled>
          <FormButtonStyled sx={{ m: 1 }} onClick={handleLogin} ref={loginButtonRef}>
            {t('loginButtonText')}
          </FormButtonStyled>
        </FormCartActionStyled>
      </Card>
    </StyledCenterBackgroundContainer>
  )
}

export default LoginPage
