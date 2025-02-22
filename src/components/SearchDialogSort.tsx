import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { SearchDialogSortProps } from '../types/common'
import { SortedOrderValues } from '../consts/search'
import { useTranslation } from 'react-i18next'

const SearchDialogSort = (props: SearchDialogSortProps) => {
  const { searchDialog, sortByFields, sortByValue, sortOrder, handleChange } = props
  const { t } = useTranslation()
  return (
    <>
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
            value={sortByValue || ''}
            onChange={(event: SelectChangeEvent<string>) => {
              handleChange(event)
            }}
            displayEmpty
          >
            <MenuItem value={undefined}>{t('general:none')}</MenuItem>
            {Object.keys(sortByFields).map((key) => (
              <MenuItem key={key} value={sortByFields[key as keyof typeof sortByFields]}>
                {t(`${searchDialog}:sortByLabels.${sortByFields[key as keyof typeof sortByFields]}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <FormControl sx={{ width: '100%' }} variant='standard' disabled={!sortByValue}>
          <InputLabel id='sort-order-select-label' sx={{ pl: 2 }}>
            {t('general:sortOrderLabel')}
          </InputLabel>
          <Select
            labelId='sort-order-select-label'
            id='sort-order'
            variant='standard'
            name='sortOrder'
            value={sortOrder || ''}
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
    </>
  )
}

export default SearchDialogSort
