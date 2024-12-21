import Grid from '@mui/material/Grid'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { EmailPattern, PasswordPattern, PhonePattern } from '../../consts/common'
import { Language } from '../../types/common'
import { useTranslation } from 'react-i18next'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { ApiException } from '../../types/exception'
import { setNotification } from '../../features/notifications.slice'
import { NotificationTypeEnum } from '../../types/notification'
import { useNavigate } from 'react-router-dom'
import { Root } from '../../styles/common'
import { Languages, UserTypes } from '../../consts/user'
import { CreateUserDto, UserDataFormProps, UserType } from '../../types/user'
import { useCreateUserMutation } from '../../app/apis/crm.api'
import Spinner from '../common/Spinner'

const CreateUser = () => {
  const [currentUserData, setCurrentUserData] = useState<UserDataFormProps>({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirm: '',
    email: '',
    phone: '',
    type: '',
    userType: '',
    language: '',
  })

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [createUser, { isLoading }] = useCreateUserMutation()

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target
    setCurrentUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSave = async () => {
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

    if (currentUserData.password !== currentUserData.confirm) {
      dispatch(
        setNotification({
          text: t('changePassword:passwordMismatch'),
          type: NotificationTypeEnum.Warning,
        }),
      )
      return
    }

    if (!PasswordPattern.test(currentUserData.password)) {
      dispatch(
        setNotification({
          text: t('changePassword:invalidPasswordFormat'),
          type: NotificationTypeEnum.Warning,
        }),
      )
      return
    }

    if (Object.values(currentUserData).some((currentUserDataValue) => !String(currentUserDataValue).trim())) {
      dispatch(
        setNotification({
          text: t('general:fillAllFields'),
          type: NotificationTypeEnum.Warning,
        }),
      )
      return
    }

    try {
      const userData: CreateUserDto = {
        firstName: currentUserData.firstName,
        lastName: currentUserData.lastName,
        password: currentUserData.password,
        username: currentUserData.username,
        email: currentUserData.email,
        phone: currentUserData.phone,
        type: currentUserData.type as UserType,
        language: currentUserData.language as Language,
      }

      const messageCode = `user:${(await createUser(userData).unwrap()).message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationTypeEnum.Success,
        }),
      )
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

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Root>
        <Typography variant='h4'>{t('user:createUserLabel')}</Typography>
      </Root>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
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
            <InputLabel id='user-type-select-label' sx={{ pl: 9.3 }}>
              {t('user:userType')}
            </InputLabel>
            <Select
              labelId='user-type-select-label'
              id='user-type'
              name='userType'
              value={currentUserData.userType}
              label={t('user:userType')}
              variant='standard'
              sx={{ width: '100%' }}
              onChange={(event: SelectChangeEvent<string>) => {
                handleChange(event)
              }}
            >
              {Object.keys(UserTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  {UserTypes[type as UserType]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='language-select-label' sx={{ pl: 9.3 }}>
              {t('user:language')}
            </InputLabel>
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
          <Button sx={{ width: '100%' }} onClick={handleSave}>
            {t('general:saveButtonText')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CreateUser
