import Grid from '@mui/material/Grid'
import { useGetUserQuery, useUpdateUserMutation } from '../../../app/apis/user.api'
import Spinner from '../../../components/Spinner'
import { Button, SelectChangeEvent } from '@mui/material'
import { EmailPattern, PhonePattern } from '../../../consts/common'
import { useTranslation } from 'react-i18next'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { ApiException } from '../../../types/common'
import { setNotification } from '../../../features/notifications.slice'
import { NotificationType } from '../../../types/notification'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateAuthAttribute } from '../../../features/auth.slice'
import { User, UserType } from '../../../types/user'
import { getEditUserPagesLabels, transformUserIntoEditPageGridData } from '../../../transformers/user'
import { GridLabel } from '../../../types/common'
import { getCurrentUser } from '../../../helpers/common'
import { Languages, SaveUserFormInitialState } from '../../../consts/user'
import GridField from '../../../components/GridField'

const EditUserTab = () => {
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

  const [userData, setUserData] = useState<Partial<User>>(SaveUserFormInitialState)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (fetchedUser) {
      setUserData(fetchedUser)
    }
  }, [fetchedUser])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => {
    const { name, value } = event.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }, [])

  if (getUserIsError || updateUserIsError) {
    dispatch(
      setNotification({
        text: JSON.stringify(getUserError || updateUserError),
        type: NotificationType.Error,
      }),
    )
    isEditProfile ? navigate('/index') : navigate(`/index/users/`)
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

      const messageCode = `users:${
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

      isEditProfile ? navigate('/index') : navigate(`/index/users/${userData.username}`)
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

  if (getUserIsLoading || updateUserIsLoading || !userData) {
    return <Spinner />
  }

  const labels: GridLabel[] = getEditUserPagesLabels(t, isEditProfile)

  const userTypeOptions = Object.keys(UserType).map((type) => t(`users:userTypes.${type.toLowerCase()}`))
  const languageOptions = Object.keys(Languages).map((language) => t(`users:userLanguages.${language.toLowerCase()}`))

  const editPageUserGridData = transformUserIntoEditPageGridData(
    userData,
    userTypeOptions,
    Object.values(UserType),
    languageOptions,
    Object.values(Languages),
  )

  return (
    <Grid container sx={{ width: '100%' }} direction='column' spacing={2}>
      <Grid item sx={{ width: '100%' }}>
        {labels.map((label) => {
          const gridFieldData = editPageUserGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
        })}
        <Button sx={{ width: '100%', mt: 3 }} onClick={handleSaveChanges}>
          {t('general:saveButtonLabel')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default EditUserTab
