import Grid from '@mui/material/Grid'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateSearchAttribute } from '../../features/search.slice'
import { CompanySortedByFields, SortedOrderValues } from '../../consts/search'
import { SearchCompanyDataFormProps } from '../../types/company'

const CompanySearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const companySearchData = useAppSelector((state) => state.search) as SearchCompanyDataFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            id='name'
            name='name'
            label={t('company:name')}
            variant='standard'
            value={companySearchData.name || ''}
            sx={{ width: '100%' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            sx={{ width: '100%' }}
            id='hqAddress'
            name='hqAddress'
            label={t('company:hqAddress')}
            variant='standard'
            value={companySearchData.hqAddress || ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            sx={{ width: '100%' }}
            id='tin'
            name='tin'
            label={t('company:tin')}
            type='number'
            variant='standard'
            value={companySearchData.tin || ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            sx={{ width: '100%' }}
            id='contact-phone'
            name='contactPhone'
            label={t('company:contactPhone')}
            variant='standard'
            value={companySearchData.contactPhone || ''}
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
              value={companySearchData.sortBy || ''}
              onChange={(event: SelectChangeEvent<string>) => {
                handleChange(event)
              }}
              displayEmpty
            >
              <MenuItem value={undefined}>{t('general:none')}</MenuItem>
              {Object.keys(CompanySortedByFields).map((key) => (
                <MenuItem key={key} value={CompanySortedByFields[key as keyof typeof CompanySortedByFields]}>
                  {t(`company:sortByLabels.${CompanySortedByFields[key as keyof typeof CompanySortedByFields]}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard' disabled={!companySearchData.sortBy}>
            <InputLabel id='sort-order-select-label' sx={{ pl: 2 }}>
              {t('general:sortOrderLabel')}
            </InputLabel>
            <Select
              labelId='sort-order-select-label'
              id='sort-order'
              variant='standard'
              name='sortOrder'
              value={companySearchData.sortOrder || ''}
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

export default CompanySearchDialog
