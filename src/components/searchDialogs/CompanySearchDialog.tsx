import Grid from '@mui/material/Grid'
import { SelectChangeEvent, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateSearchAttribute } from '../../features/search.slice'
import { CompanySortedByFields } from '../../consts/search'
import { SearchCompanyDataFormProps } from '../../types/company'
import SearchDialogSort from '../SearchDialogSort'

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
        <SearchDialogSort
          searchDialog='company'
          sortByFields={CompanySortedByFields}
          sortByValue={companySearchData.sortBy}
          sortOrder={companySearchData.sortOrder}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  )
}

export default CompanySearchDialog
