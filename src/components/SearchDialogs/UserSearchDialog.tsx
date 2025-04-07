import Grid from '@mui/material/Grid'
import { SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { UserSearchFormProps, UserType } from '../../types/user'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateSearchAttribute } from '../../features/search.slice'
import { UserSortedByFields } from '../../consts/search'
import SearchDialogSort from '../SearchDialogSort'
import { ModuleOptions } from '../../types/common'
import { getEnumTranslations } from '../../helpers/common'
import { getUserSearchFormLabels, getUserSearchGridData } from '../../transformers/user'
import GridField from '../GridField'

const UserSearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const userSearchData = useAppSelector((state) => state.search) as UserSearchFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string | string[]>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  const labels = getUserSearchFormLabels(t)
  const userSearchGridData = getUserSearchGridData(userSearchData, getEnumTranslations(UserType, t, 'users:userTypes'))

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = userSearchGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
        })}
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
