import Grid from '@mui/material/Grid'
import { useGetUserQuery, useUpdateUserMutation } from '../../app/apis/user.api'
import Spinner from '../common/Spinner'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { EmailPattern, GridFieldTypes, PhonePattern } from '../../consts/common'
import { useTranslation } from 'react-i18next'
import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { ApiException } from '../../types/exception'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateAuthAttribute } from '../../features/auth.slice'
import { User } from '../../types/user'
import { transformUserIntoEditViewGridData } from '../../transformers/user'
import { ViewLabel } from '../../types/common'
import { getCurrentUser } from '../../helpers/common'

const EditUser = () => {
  const location = useLocation()
  const params = useParams()

  const isEditProfile = location.pathname.includes('edit-profile')

  const username = String(isEditProfile ? getCurrentUser().username : params.username)

  const {
    data: fetchedUser,
    isLoading: getUserIsLoading,
    isError: getUserIsError,
    error: getUserError,
  } = useGetUserQuery(username)
  const [updateUser, { isLoading: updateUserIsLoading, isError: updateUserIsError, error: updateUserError }] =
    useUpdateUserMutation()

  const [userData, setUserData] = useState<User | null>(null)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (fetchedUser) {
      setUserData(fetchedUser)
    }
  }, [fetchedUser])

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    if (!userData) return
    const { name, value } = event.target
    setUserData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  if (getUserIsError || !fetchedUser || updateUserIsError) {
    dispatch(
      setNotification({
        text: JSON.stringify(getUserError || updateUserError),
        type: NotificationType.Error,
      }),
    )
    isEditProfile ? navigate('/index') : navigate(`/index/user-management/`)
    return null
  }

  const handleSaveChanges = async () => {
    if (!userData) return

    if (!EmailPattern.test(String(userData.email))) {
      dispatch(
        setNotification({
          text: t('general:emailFormatError'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (!PhonePattern.test(String(userData.phone))) {
      dispatch(
        setNotification({
          text: t('general:phoneFormatError'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    try {
      const updatedData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        type: userData.type,
        language: userData.language,
      }

      if (Object.values(updatedData).some((value) => !String(value).trim())) {
        dispatch(
          setNotification({
            text: t('general:fillAllFields'),
            type: NotificationType.Warning,
          }),
        )
        return
      }

      const messageCode = `user:${
        (
          await updateUser({
            username: String(userData.username),
            user: updatedData,
          }).unwrap()
        ).message
      }`

      if (userData.language !== fetchedUser?.language) {
        dispatch(updateAuthAttribute({ attribute: 'language', value: userData.language }))
      }

      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )

      isEditProfile ? navigate('/index') : navigate(`/index/user-management/user/${userData.username}`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `user:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  if (getUserIsLoading || updateUserIsLoading || !userData) {
    return <Spinner />
  }

  const labels: ViewLabel[] = [
    { label: t('user:firstName'), key: 'firstName' },
    { label: t('user:lastName'), key: 'lastName' },
    { label: t('user:email'), key: 'email' },
    { label: t('user:phone'), key: 'phone' },
    { label: t('user:type'), key: 'type', skip: isEditProfile },
    { label: t('user:language'), key: 'language' },
  ]

  const editViewUserGridData = transformUserIntoEditViewGridData(userData)

  return (
    <Grid container sx={{ width: '100%' }} direction='column' spacing={2}>
      <Grid item sx={{ width: '100%' }}>
        {labels
          .filter((label) => !label.skip)
          .map((label) => {
            const gridFieldData = editViewUserGridData[label.key]
            if (gridFieldData.type === GridFieldTypes.SELECT && gridFieldData?.options) {
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
                      value={String(userData[label.key as keyof User])}
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
            } else if (gridFieldData.type === GridFieldTypes.STRING) {
              return (
                <Grid item sx={{ width: '100%', mb: 1 }} key={label.key}>
                  <TextField
                    sx={{ width: '100%' }}
                    id={label.key}
                    name={label.key}
                    label={label.label}
                    variant='standard'
                    value={userData[label.key as keyof User]}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      handleChange(event)
                    }}
                  />
                </Grid>
              )
            }
            return <Grid item sx={{ width: '100%', mb: 1 }} key={label.key}></Grid>
          })}
        <Button sx={{ width: '100%', mt: 3 }} onClick={handleSaveChanges}>
          {t('general:saveButtonText')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default EditUser
