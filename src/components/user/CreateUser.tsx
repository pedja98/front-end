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
import { EmailPattern, GridFieldTypes, PasswordPattern, PhonePattern } from '../../consts/common'
import { ViewLabel } from '../../types/common'
import { useTranslation } from 'react-i18next'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { ApiException } from '../../types/exception'
import { setNotification } from '../../features/notifications.slice'
import { NotificationTypeEnum } from '../../types/notification'
import { useNavigate } from 'react-router-dom'
import { CreateUserDto, CreateUserDataFormProps, UserType } from '../../types/user'
import { useCreateUserMutation } from '../../app/apis/crm.api'
import Spinner from '../common/Spinner'
import { getCreateUserGridData } from '../../transformers/user'

const CreateUser = () => {
  const [currentUserData, setCurrentUserData] = useState<CreateUserDataFormProps>({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirm: '',
    email: '',
    phone: '',
    type: '',
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
      }

      const messageCode = `user:${(await createUser(userData).unwrap()).message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationTypeEnum.Success,
        }),
      )
      navigate(`/index/user-managment/user/${userData.username}`)
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

  const labels: ViewLabel[] = [
    { label: t('user:firstName'), key: 'firstName' },
    { label: t('user:lastName'), key: 'lastName' },
    { label: t('user:username'), key: 'username' },
    { label: t('user:password'), key: 'password' },
    { label: t('user:confirm'), key: 'confirm' },
    { label: t('user:email'), key: 'email' },
    { label: t('user:phone'), key: 'phone' },
    { label: t('user:type'), key: 'type' },
  ]
  const createUserGridData = getCreateUserGridData()

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>{t('user:createUserLabel')}</Typography>
      </Grid>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = createUserGridData[label.key]
          if (gridFieldData.type === GridFieldTypes.STRING) {
            return (
              <Grid item sx={{ width: '100%' }} key={label.key}>
                <TextField
                  id={label.key}
                  name={label.key}
                  label={label.label}
                  variant='standard'
                  value={currentUserData[label.key as keyof CreateUserDataFormProps]}
                  sx={{ width: '100%' }}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleChange(event)
                  }}
                />
              </Grid>
            )
          } else if (gridFieldData.type === GridFieldTypes.PASSWORD) {
            return (
              <Grid item sx={{ width: '100%' }} key={label.key}>
                <TextField
                  id={label.key}
                  name={label.key}
                  label={label.label}
                  type='password'
                  variant='standard'
                  value={currentUserData[label.key as keyof CreateUserDataFormProps]}
                  sx={{ width: '100%' }}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleChange(event)
                  }}
                />
              </Grid>
            )
          } else if (gridFieldData.type === GridFieldTypes.SELECT && gridFieldData?.options) {
            return (
              <Grid item sx={{ width: '100%', mb: 1 }} key={label.key}>
                <FormControl sx={{ width: '100%' }} variant='standard'>
                  <InputLabel id={label.key} sx={{ pl: 9.3 }}>
                    {label.label}
                  </InputLabel>
                  <Select
                    labelId={label.key}
                    id={label.key}
                    name={label.key}
                    value={String(currentUserData[label.key as keyof CreateUserDataFormProps])}
                    variant='standard'
                    sx={{ width: '100%' }}
                    onChange={(event: SelectChangeEvent<string>) => {
                      handleChange(event)
                    }}
                  >
                    {gridFieldData?.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {t(`${label.key}.${option.toLowerCase()}`)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )
          }
          return <Grid key={label.key}></Grid>
        })}
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
