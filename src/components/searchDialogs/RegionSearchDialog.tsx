import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { SearchRegionDataFormProps } from '../../types/region'
import { updateSearchAttribute } from '../../features/search.slice'
import { ChangeEvent } from 'react'
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { RegionSortedByFields, SortedOrderValues } from '../../consts/search'

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
            label={t('region:name')}
            variant='standard'
            value={regionSearchData.name || ''}
            sx={{ width: '100%' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='sort-by-select-label' sx={{ pl: 2 }}>
              {t('general:sortByLabel')}
            </InputLabel>
            <Select
              labelId='sort-by-select-label'
              id='sort-by'
              variant='standard'
              name='sortBy'
              value={regionSearchData.sortBy || ''}
              onChange={(event: SelectChangeEvent<string>) => {
                handleChange(event)
              }}
              displayEmpty
            >
              <MenuItem value={undefined}>{t('general:none')}</MenuItem>
              {Object.keys(RegionSortedByFields).map((key) => (
                <MenuItem key={key} value={RegionSortedByFields[key as keyof typeof RegionSortedByFields]}>
                  {t(`region:sortByLabels.${RegionSortedByFields[key as keyof typeof RegionSortedByFields]}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard' disabled={!regionSearchData.sortBy}>
            <InputLabel id='sort-order-select-label' sx={{ pl: 2 }}>
              {t('general:sortOrderLabel')}
            </InputLabel>
            <Select
              labelId='sort-order-select-label'
              id='sort-order'
              variant='standard'
              name='sortOrder'
              value={regionSearchData.sortOrder || ''}
              onChange={(event: SelectChangeEvent<string>) => {
                handleChange(event)
              }}
              displayEmpty
            >
              <MenuItem value={undefined}>{t('general:none')}</MenuItem>
              {Object.keys(SortedOrderValues).map((key) => (
                <MenuItem key={key} value={SortedOrderValues[key as keyof typeof SortedOrderValues]}>
                  {t(`general:sortOrderValueLabels.${SortedOrderValues[key as keyof typeof SortedOrderValues]}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RegionSearchDialog
