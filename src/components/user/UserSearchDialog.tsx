import Grid from '@mui/material/Grid'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Checkbox,
  ListItemText,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { UserTypes } from '../../consts/user'
import { SearchUserDataFormProps, UserType } from '../../types/user'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateSearchAttribute } from '../../features/search.slice'

const UserSearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const userSearchData = useAppSelector((state) => state.search) as SearchUserDataFormProps

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]>) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            id='first-name'
            name='firstName'
            label={t('user:firstName')}
            variant='standard'
            value={userSearchData.firstName || ''}
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
            value={userSearchData.lastName || ''}
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
            value={userSearchData.username || ''}
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
            value={userSearchData.email || ''}
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
            value={userSearchData.phone || ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='user-type-select-label' sx={{ pl: 2 }}>
              {t('user:type')}
            </InputLabel>
            <Select
              labelId='user-type-select-label'
              id='user-type'
              variant='standard'
              name='type'
              multiple
              value={userSearchData.type || []}
              onChange={(event: SelectChangeEvent<string[]>) => {
                handleChange(event)
              }}
              renderValue={(selected) =>
                selected && selected.length > 0 ? selected.map((type) => UserTypes[type as UserType]).join(', ') : ''
              }
            >
              {Object.keys(UserTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={userSearchData.type?.includes(type) || false} />
                  <ListItemText primary={UserTypes[type as UserType]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserSearchDialog