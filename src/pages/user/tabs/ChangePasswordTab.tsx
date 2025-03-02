import { Button, Grid, TextField } from '@mui/material'
import { ChangeEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChangePasswordFormProps } from '../../../types/auth'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { NotificationType } from '../../../types/notification'
import { setNotification } from '../../../features/notifications.slice'
import { useChangePasswordMutation } from '../../../app/apis/user.api'
import Spinner from '../../../components/Spinner'
import { ApiException } from '../../../types/common'
import { GridFieldTypes, PasswordPattern } from '../../../consts/common'
import { useNavigate } from 'react-router-dom'
import { ChangePasswordFormInitialState } from '../../../consts/user'
import { getUserChangePasswordGridData, getUserChangePasswordLabels } from '../../../transformers/user'

const ChangePasswordTab = () => {
  const { t } = useTranslation()
  const currentUsername = String(useAppSelector((state) => state.auth.username))
  const [changePassword, { isLoading }] = useChangePasswordMutation()
  const navigate = useNavigate()

  const [changePasswordFormProps, setChangePasswordFormProps] =
    useState<ChangePasswordFormProps>(ChangePasswordFormInitialState)
  const dispatch = useAppDispatch()

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setChangePasswordFormProps((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }, [])

  if (isLoading) {
    return <Spinner />
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
          text: t('users:passwordNotChanged'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (!PasswordPattern.test(changePasswordFormProps.newPassword)) {
      dispatch(
        setNotification({
          text: t('users:invalidPasswordFormat'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (changePasswordFormProps.newPassword !== changePasswordFormProps.confirmNewPassword) {
      dispatch(
        setNotification({
          text: t('users:passwordMismatch'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    try {
      const messageCode = `users:${
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
      const errorCode = `users:${errorResponse.data}` || 'general:unknowError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  const changePasswordGridData = getUserChangePasswordGridData()
  const labels = getUserChangePasswordLabels(t)

  return (
    <Grid container sx={{ width: '100%' }} direction='column' spacing={2}>
      {labels.map((label) => {
        const gridFieldData = changePasswordGridData[label.key]
        return (
          <Grid item sx={{ width: '100%' }} key={label.key}>
            <TextField
              id={label.key}
              name={label.key}
              label={label.label}
              type={gridFieldData.type === GridFieldTypes.PASSWORD ? 'password' : undefined}
              variant='standard'
              required={!!gridFieldData.required}
              value={changePasswordFormProps[label.key as keyof ChangePasswordFormProps]}
              sx={{ width: '100%' }}
              onChange={handleChange}
            />
          </Grid>
        )
      })}
      <Grid item sx={{ width: '100%' }}>
        <Button sx={{ width: '100%' }} onClick={handleChangePassword}>
          {t('general:saveButtonLabel')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default ChangePasswordTab
