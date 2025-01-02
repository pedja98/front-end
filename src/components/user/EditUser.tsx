import Grid from '@mui/material/Grid'
import { useGetUserQuery, useUpdateUserMutation } from '../../app/apis/crm.api'
import Spinner from '../common/Spinner'
import { getCurrentUser, isViewSelect } from '../../helpers/common'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { EmailPattern, PhonePattern } from '../../consts/common'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateUserAttribute } from '../../features/user.slice'
import { ApiException } from '../../types/exception'
import { setNotification } from '../../features/notifications.slice'
import { NotificationTypeEnum } from '../../types/notification'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateAuthAttribute } from '../../features/auth.slice'
import { User, UserState } from '../../types/user'
import { transformUserDataForEditView } from '../../transformers/user'
import { ViewLabel } from '../../types/common'

const EditUser = () => {
  const { isLoading: getUserLoading } = useGetUserQuery(String(getCurrentUser().username))
  const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation()

  const currentUserData = useAppSelector((state) => state.user)
  const currentLanguage = useAppSelector((state) => state.auth.language)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const isEditProfile = location.pathname.includes('edit-profile')

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
      const errorCode = `user:${errorResponse.data}` || 'general:unknowError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationTypeEnum.Error,
        }),
      )
    }
  }

  if (getUserLoading || updateUserLoading) {
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

  const userViewData = transformUserDataForEditView(currentUserData as unknown as User)

  return (
    <Grid container sx={{ width: '100%' }} direction='column' spacing={2}>
      <Grid item sx={{ width: '100%' }}>
        {labels
          .filter((label) => !label.skip)
          .map((label) => {
            const cellData = userViewData[label.key]
            if (isViewSelect(cellData)) {
              return (
                <Grid item sx={{ width: '100%', mb: 1 }} key={label.key}>
                  <FormControl sx={{ width: '100%' }} variant='standard'>
                    <InputLabel id={label.key}>{label.label}</InputLabel>
                    <Select
                      labelId={label.key}
                      id={label.key}
                      name={label.key}
                      value={String(currentUserData[label.key as keyof UserState])}
                      variant='standard'
                      sx={{ width: '100%' }}
                      onChange={(event: SelectChangeEvent<string>) => {
                        handleChange(event)
                      }}
                    >
                      {cellData.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {t(`${label.key}.${option.toLocaleLowerCase()}`)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )
            }
            return (
              <Grid item sx={{ width: '100%', mb: 1 }} key={label.key}>
                <TextField
                  sx={{ width: '100%' }}
                  id={label.key}
                  name={label.key}
                  label={label.label}
                  variant='standard'
                  value={currentUserData[label.key as keyof UserState]}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleChange(event)
                  }}
                />
              </Grid>
            )
          })}
        <Button sx={{ width: '100%', mt: 3 }} onClick={handleSaveChanges}>
          {t('general:saveButtonText')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default EditUser
