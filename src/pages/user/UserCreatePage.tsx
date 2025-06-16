import Grid from '@mui/material/Grid'
import { Button, SelectChangeEvent, Typography } from '@mui/material'
import { EmailPattern, PasswordPattern, PhonePattern } from '../../consts/common'
import { GridLabel } from '../../types/common'
import { useTranslation } from 'react-i18next'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { ApiException } from '../../types/common'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useNavigate } from 'react-router-dom'
import { User, UserType } from '../../types/user'
import { useCreateUserMutation } from '../../app/apis/crm/user.api'
import { getCreateUserPagesLabels, transformUserIntoEditPageGridData } from '../../transformers/user'
import Spinner from '../../components/Spinner'
import { Languages, SaveUserFormInitialState } from '../../consts/user'
import GridField from '../../components/GridField'

const UserCreatePage = () => {
  const [createUserData, setCreateUserData] = useState<Partial<User>>(SaveUserFormInitialState)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [createUser, { isLoading }] = useCreateUserMutation()

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => {
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

      const messageCode = `users:${(await createUser(userData).unwrap()).message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(`/index/users/${userData.username}`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `users:${errorResponse.data}` || 'general:unknownError'
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

  const labels: GridLabel[] = getCreateUserPagesLabels(t)

  const userTypeOptions = Object.keys(UserType).map((type) => t(`users:userTypes.${type.toLowerCase()}`))
  const languageOptions = Object.keys(Languages).map((language) => t(`users:userLanguages.${language.toLowerCase()}`))

  const createUserGridData = transformUserIntoEditPageGridData(
    createUserData,
    userTypeOptions,
    Object.values(UserType),
    languageOptions,
    Object.values(Languages),
  )

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>{t('users:createUserLabel').toUpperCase()}</Typography>
      </Grid>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = createUserGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
        })}
        <Grid item sx={{ width: '100%' }}>
          <Button sx={{ width: '100%' }} onClick={handleSave}>
            {t('general:saveButtonLabel')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserCreatePage
