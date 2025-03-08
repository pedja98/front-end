import Grid from '@mui/material/Grid'
import { SelectChangeEvent } from '@mui/material'
import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateSearchAttribute } from '../../features/search.slice'
import { CustomerSessionSortedByFields } from '../../consts/search'
import SearchDialogSort from '../SearchDialogSort'
import { ContactSearchFormProps } from '../../types/contact'
import { ModulesOptions } from '../../types/common'

const CustomerSessionSearchDialog = () => {
  const dispatch = useAppDispatch()
  const contactSearchData = useAppSelector((state) => state.search) as ContactSearchFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SearchDialogSort
        moduleOption={ModulesOptions.CustomerSessions}
        sortByFields={CustomerSessionSortedByFields}
        sortByValue={contactSearchData.sortBy}
        sortOrder={contactSearchData.sortOrder}
        handleChange={handleChange}
      />
    </Grid>
  )
}

export default CustomerSessionSearchDialog
