import Grid from '@mui/material/Grid'
import { useGetUserByUsernameQuery, useUpdateUserMutation } from '../app/apis/crm.api'
import Spinner from '../components/Spinner'
import { getCurrentUser } from '../helpers/common'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { EmailPattern, Languages, PhonePattern } from '../consts/common'
import { Language } from '../types/common'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { updateUserAttribute } from '../features/user.slice'
import { ApiException } from '../types/exception'
import { setNotification } from '../features/notifications.slice'
import { NotificationTypeEnum } from '../types/notification'
import { useNavigate } from 'react-router-dom'
import { updateAuthAttribute } from '../features/auth.slice'

const EditProfile = () => {
  const { isLoading: getUserByUsernameLoading } = useGetUserByUsernameQuery(String(getCurrentUser().username))
  const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation()

  const currentUserData = useAppSelector((state) => state.user)
  const currentLanguage = useAppSelector((state) => state.auth.language)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    dispatch(updateUserAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  const handleSaveChanges = async () => {
    if (!EmailPattern.test(String(currentUserData.email))) {
      dispatch(
        setNotification({
          text: t('general:emailFormatError'),
          type: NotificationTypeEnum.Warning,
        }),
      )
      return
    }

    if (!PhonePattern.test(String(currentUserData.phone))) {
      dispatch(
        setNotification({
          text: t('general:phoneFormatError'),
          type: NotificationTypeEnum.Warning,
        }),
      )
      return
    }

    try {
      const userData = {
        firstName: currentUserData.firstName,
        lastName: currentUserData.lastName,
        email: currentUserData.email,
        phone: currentUserData.phone,
        type: currentUserData.type,
        language: currentUserData.language,
      }

      if (Object.values(userData).some((userDataValue) => !String(userDataValue).trim())) {
        dispatch(
          setNotification({
            text: t('general:fillAllFields'),
            type: NotificationTypeEnum.Warning,
          }),
        )
        return
      }

      const messageCode = `user:${
        (
          await updateUser({
            username: String(currentUserData.username),
            user: userData,
          }).unwrap()
        ).message
      }`

      if (currentLanguage !== currentUserData.language) {
        dispatch(updateAuthAttribute({ attribute: 'language', value: currentUserData.language }))
      }

      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationTypeEnum.Success,
        }),
      )

      navigate('/index')
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `user:${errorResponse.data?.error}` || 'general:unknowError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationTypeEnum.Error,
        }),
      )
    }
  }

  if (getUserByUsernameLoading || updateUserLoading) {
    return <Spinner />
  }

  return (
    <Grid container sx={{ mt: 1.5, width: '100%', alignItems: 'center' }} direction='column' spacing={2}>
      <Grid item sx={{ width: '40%' }}>
        <TextField
          id='first-name'
          name='firstName'
          label={t('user:firstName')}
          variant='standard'
          value={currentUserData?.firstName}
          sx={{ width: '100%' }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event)
          }}
        />
      </Grid>
      <Grid item sx={{ width: '40%' }}>
        <TextField
          sx={{ width: '100%' }}
          id='last-name'
          name='lastName'
          label={t('user:lastName')}
          variant='standard'
          value={currentUserData?.lastName}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event)
          }}
        />
      </Grid>
      <Grid item sx={{ width: '40%' }}>
        <TextField
          sx={{ width: '100%' }}
          id='email'
          name='email'
          label={t('user:email')}
          variant='standard'
          value={currentUserData?.email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event)
          }}
        />
      </Grid>
      <Grid item sx={{ width: '40%' }}>
        <TextField
          sx={{ width: '100%' }}
          id='phone'
          name='phone'
          label={t('user:phone')}
          variant='standard'
          value={currentUserData?.phone}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event)
          }}
        />
      </Grid>
      <Grid item sx={{ width: '40%' }}>
        <FormControl sx={{ width: '100%' }} variant='standard'>
          <InputLabel id='language-select-label'>{t('user:language')}</InputLabel>
          <Select
            labelId='language-select-label'
            id='language'
            name='language'
            value={currentUserData?.language}
            label='Language'
            variant='standard'
            sx={{ width: '100%' }}
            onChange={(event: SelectChangeEvent<string>) => {
              handleChange(event)
            }}
          >
            {Object.keys(Languages).map((lang) => (
              <MenuItem key={lang} value={lang}>
                {Languages[lang as Language]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sx={{ width: '40%' }}>
        <Button sx={{ width: '100%' }} onClick={handleSaveChanges}>
          {t('general:saveButtonText')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default EditProfile
