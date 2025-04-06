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
import { UserSearchFormProps, UserType } from '../../types/user'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateSearchAttribute } from '../../features/search.slice'
import { UserSortedByFields } from '../../consts/search'
import SearchDialogSort from '../SearchDialogSort'
import { ModuleOptions } from '../../types/common'
import { getEnumTranslations } from '../../helpers/common'

const UserSearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const userSearchData = useAppSelector((state) => state.search) as UserSearchFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  const userTypes = getEnumTranslations(UserType, t, 'users:userTypes')

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            id='first-name'
            name='firstName'
            label={t('users:firstName')}
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
            label={t('users:lastName')}
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
            label={t('users:username')}
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
            label={t('users:email')}
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
            label={t('users:phone')}
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
              {t('users:type')}
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
                selected && selected.length > 0 ? selected.map((type) => userTypes[type as UserType]).join(', ') : ''
              }
            >
              {Object.keys(userTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={userSearchData.type?.includes(type) || false} />
                  <ListItemText primary={userTypes[type as UserType]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <SearchDialogSort
          moduleOption={ModuleOptions.Users}
          sortByFields={UserSortedByFields}
          sortByValue={userSearchData.sortBy}
          sortOrder={userSearchData.sortOrder}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  )
}

export default UserSearchDialog
