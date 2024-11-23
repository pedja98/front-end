import Grid from '@mui/material/Grid'
import { useGetUserByUsernameQuery } from '../app/apis/crm.api'
import Spinner from '../components/Spinner'
import { getCurrentUser } from '../helpers/common'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { Languages } from '../consts/common'
import { Language } from '../types/common'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setUserAttribute } from '../features/user.slice'

const EditProfile = () => {
  const { isLoading } = useGetUserByUsernameQuery(String(getCurrentUser().username))
  const currentUserData = useAppSelector((state) => state.user)
  const { t } = useTranslation()

  if (isLoading) {
    return <Spinner />
  }

  const dispatch = useAppDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    dispatch(setUserAttribute({ attribute: event.target.name, value: event.target.value }))
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
        <Button sx={{ width: '100%' }}>{t('general:saveButtonText')}</Button>
      </Grid>
    </Grid>
  )
}

export default EditProfile
