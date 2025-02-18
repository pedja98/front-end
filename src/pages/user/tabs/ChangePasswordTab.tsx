import { Button, Grid, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChangePasswordFormProps } from '../../../types/auth'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { NotificationType } from '../../../types/notification'
import { setNotification } from '../../../features/notifications.slice'
import { useChangePasswordMutation } from '../../../app/apis/user.api'
import Spinner from '../../../components/Spinner'
import { ApiException } from '../../../types/common'
import { PasswordPattern } from '../../../consts/common'
import { useNavigate } from 'react-router-dom'
import { ChangePasswordFormInitialState } from '../../../consts/user'

const ChangePasswordTab = () => {
  const { t } = useTranslation()
  const currentUsername = String(useAppSelector((state) => state.auth.username))
  const [changePassword, { isLoading }] = useChangePasswordMutation()
  const navigate = useNavigate()

  const [changePasswordFormProps, setChangePasswordFormProps] =
    useState<ChangePasswordFormProps>(ChangePasswordFormInitialState)
  const dispatch = useAppDispatch()

  if (isLoading) {
    return <Spinner />
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChangePasswordFormProps({ ...changePasswordFormProps, [event.target.name]: event.target.value })
  }

  const handleChangePassword = async () => {
    if (Object.values(changePasswordFormProps).some((userDataValue) => !String(userDataValue).trim())) {
      dispatch(
        setNotification({
          text: t('general:fillAllRequiredFields'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (changePasswordFormProps.newPassword === changePasswordFormProps.currentPassword) {
      dispatch(
        setNotification({
          text: t('changePassword:passwordNotChanged'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (!PasswordPattern.test(changePasswordFormProps.newPassword)) {
      dispatch(
        setNotification({
          text: t('changePassword:invalidPasswordFormat'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (changePasswordFormProps.newPassword !== changePasswordFormProps.confirmNewPassword) {
      dispatch(
        setNotification({
          text: t('changePassword:passwordMismatch'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    try {
      const messageCode = `changePassword:${
        (
          await changePassword({
            username: currentUsername,
            oldPassword: changePasswordFormProps.currentPassword,
            newPassword: changePasswordFormProps.newPassword,
          }).unwrap()
        ).message
      }`

      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )

      navigate('/index')
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `changePassword:${errorResponse.data}` || 'general:unknowError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  return (
    <Grid container sx={{ width: '100%' }} direction='column' spacing={2}>
      <Grid item sx={{ width: '100%' }}>
        <TextField
          id='current-password'
          name='currentPassword'
          type='password'
          label={t('changePassword:currentPassword')}
          variant='standard'
          value={changePasswordFormProps.currentPassword}
          sx={{ width: '100%' }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <TextField
          sx={{ width: '100%' }}
          id='new-password'
          name='newPassword'
          type='password'
          label={t('changePassword:newPassword')}
          variant='standard'
          value={changePasswordFormProps.newPassword}
          onChange={handleChange}
        />
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <TextField
          sx={{ width: '100%' }}
          id='confirm-new-password'
          name='confirmNewPassword'
          type='password'
          label={t('changePassword:confirmNewPassword')}
          variant='standard'
          value={changePasswordFormProps.confirmNewPassword}
          onChange={handleChange}
        />
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <Button sx={{ width: '100%' }} onClick={handleChangePassword}>
          {t('general:saveButtonLabel')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default ChangePasswordTab
