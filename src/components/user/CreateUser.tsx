import Grid from '@mui/material/Grid'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { EmailPattern, Languages, PhonePattern } from '../../consts/common'
import { Language } from '../../types/common'
import { useTranslation } from 'react-i18next'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { ApiException } from '../../types/exception'
import { setNotification } from '../../features/notifications.slice'
import { NotificationTypeEnum } from '../../types/notification'
import { useNavigate } from 'react-router-dom'

interface UserData {
  firstName: string
  lastName: string
  username: string
  password: string
  confirm: string
  email: string
  phone: string
  type: string
  language: string
}

const CreateUser = () => {
  const [currentUserData, setCurrentUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirm: '',
    email: '',
    phone: '',
    type: '',
    language: '',
  })

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target
    setCurrentUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
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

      // Add the code for saving the changes here (e.g., API call)

      navigate('/index')
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `user:${errorResponse.data}` || 'general:unknowError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationTypeEnum.Error,
        }),
      )
    }
  }

  return (
    <Grid container sx={{ width: '100%' }} direction='column' spacing={2}>
      <Grid item sx={{ width: '100%' }}>
        <TextField
          id='first-name'
          name='firstName'
          label={t('user:firstName')}
          variant='standard'
          value={currentUserData.firstName}
          sx={{ width: '100%' }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event)
          }}
        />
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <TextField
          sx={{ width: '100%' }}
          id='last-name'
          name='lastName'
          label={t('user:lastName')}
          variant='standard'
          value={currentUserData.lastName}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event)
          }}
        />
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <TextField
          sx={{ width: '100%' }}
          id='username'
          name='username'
          label={t('user:username')}
          variant='standard'
          value={currentUserData.username}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event)
          }}
        />
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <TextField
          sx={{ width: '100%' }}
          id='password'
          name='password'
          type='password'
          label={t('user:password')}
          variant='standard'
          value={currentUserData.password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event)
          }}
        />
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <TextField
          sx={{ width: '100%' }}
          id='confirm'
          name='confirm'
          type='password'
          label={t('user:confirm')}
          variant='standard'
          value={currentUserData.confirm}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event)
          }}
        />
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <TextField
          sx={{ width: '100%' }}
          id='email'
          name='email'
          label={t('user:email')}
          variant='standard'
          value={currentUserData.email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event)
          }}
        />
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <TextField
          sx={{ width: '100%' }}
          id='phone'
          name='phone'
          label={t('user:phone')}
          variant='standard'
          value={currentUserData.phone}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event)
          }}
        />
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <FormControl sx={{ width: '100%' }} variant='standard'>
          <InputLabel id='language-select-label'>{t('user:language')}</InputLabel>
          <Select
            labelId='language-select-label'
            id='language'
            name='language'
            value={currentUserData.language}
            label={t('user:language')}
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
      <Grid item sx={{ width: '100%' }}>
        <Button sx={{ width: '100%' }} onClick={handleSaveChanges}>
          {t('general:saveButtonText')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default CreateUser
