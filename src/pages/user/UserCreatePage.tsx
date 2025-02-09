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
import { PageLabel } from '../../types/common'
import { useTranslation } from 'react-i18next'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { ApiException } from '../../types/common'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useNavigate } from 'react-router-dom'
import { User, UserType } from '../../types/user'
import { useCreateUserMutation } from '../../app/apis/user.api'
import { getCreateUserGridData } from '../../transformers/user'
import Spinner from '../../components/Spinner'

const UserCreatePage = () => {
  const [createUserData, setCreateUserData] = useState<Partial<User>>({
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
    setCreateUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    if (!EmailPattern.test(String(createUserData.email))) {
      dispatch(
        setNotification({
          text: t('general:emailFormatError'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (!PhonePattern.test(String(createUserData.phone))) {
      dispatch(
        setNotification({
          text: t('general:phoneFormatError'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (createUserData.password !== createUserData.confirm) {
      dispatch(
        setNotification({
          text: t('changePassword:passwordMismatch'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (!PasswordPattern.test(String(createUserData.password))) {
      dispatch(
        setNotification({
          text: t('changePassword:invalidPasswordFormat'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (Object.values(createUserData).some((currentUserDataValue) => !String(currentUserDataValue).trim())) {
      dispatch(
        setNotification({
          text: t('general:fillAllRequiredFields'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    try {
      const userData: Partial<User> = {
        firstName: createUserData.firstName,
        lastName: createUserData.lastName,
        password: createUserData.password,
        username: createUserData.username,
        email: createUserData.email,
        phone: createUserData.phone,
        type: createUserData.type as UserType,
      }

      const messageCode = `user:${(await createUser(userData).unwrap()).message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(`/index/user-management/user/${userData.username}`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `user:${errorResponse.data}` || 'general:unknowError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  const labels: PageLabel[] = [
    { label: t('user:firstName'), key: 'firstName' },
    { label: t('user:lastName'), key: 'lastName' },
    { label: t('user:username'), key: 'username' },
    { label: t('user:password'), key: 'password' },
    { label: t('user:confirm'), key: 'confirm' },
    { label: t('user:email'), key: 'email' },
    { label: t('user:phone'), key: 'phone' },
    { label: t('user:type'), key: 'type' },
  ]

  const userTypeOptions = Object.keys(UserType).map((type) => t(`user:userTypes.${type.toLowerCase()}`))

  const createUserGridData = getCreateUserGridData(userTypeOptions, Object.values(UserType))

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
                  value={createUserData[label.key as keyof User]}
                  sx={{ width: '100%' }}
                  required={!!gridFieldData.required}
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
                  required={!!gridFieldData.required}
                  value={createUserData[label.key as keyof User]}
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
                  <InputLabel id={label.key} sx={{ pl: 9.3 }} required={gridFieldData.required}>
                    {label.label}
                  </InputLabel>
                  <Select
                    labelId={label.key}
                    id={label.key}
                    name={label.key}
                    value={String(createUserData[label.key as keyof User])}
                    variant='standard'
                    sx={{ width: '100%' }}
                    onChange={(event: SelectChangeEvent<string>) => {
                      handleChange(event)
                    }}
                  >
                    {gridFieldData?.options.map((option, index) => (
                      <MenuItem key={index} value={gridFieldData?.optionsValues?.[index] ?? ''}>
                        {option}
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

export default UserCreatePage
