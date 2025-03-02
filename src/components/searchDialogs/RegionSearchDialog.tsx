import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { SearchRegionDataFormProps } from '../../types/region'
import { updateSearchAttribute } from '../../features/search.slice'
import { ChangeEvent } from 'react'
import { Grid, SelectChangeEvent, TextField } from '@mui/material'
import { RegionSortedByFields } from '../../consts/search'
import SearchDialogSort from '../SearchDialogSort'
import { ModulesOptions } from '../../types/common'

const RegionSearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const regionSearchData = useAppSelector((state) => state.search) as SearchRegionDataFormProps

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            id='name'
            name='name'
            label={t('regions:name')}
            variant='standard'
            value={regionSearchData.name || ''}
            sx={{ width: '100%' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <SearchDialogSort
          moduleOption={ModulesOptions.Regions}
          sortByFields={RegionSortedByFields}
          sortByValue={regionSearchData.sortBy}
          sortOrder={regionSearchData.sortOrder}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  )
}

export default RegionSearchDialog
