import Grid from '@mui/material/Grid'
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateSearchAttribute } from '../../features/search.slice'
import { CompanySortedByFields } from '../../consts/search'
import { CompanyStatus, SearchCompanyDataFormProps } from '../../types/company'
import SearchDialogSort from '../SearchDialogSort'
import { ModuleOptions } from '../../types/common'
import { CompanyStatuses } from '../../consts/company'

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
            label={t('companies:name')}
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
            label={t('companies:hqAddress')}
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
            label={t('companies:tin')}
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
            label={t('companies:contactPhone')}
            variant='standard'
            value={companySearchData.contactPhone || ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='company-status-select-label' sx={{ pl: 2 }}>
              {t('companies:status')}
            </InputLabel>
            <Select
              labelId='company-status-select-label'
              id='ompany-status'
              variant='standard'
              name='status'
              multiple
              value={companySearchData.status || []}
              onChange={(event: SelectChangeEvent<string[]>) => {
                handleChange(event)
              }}
              renderValue={(selected) =>
                selected && selected.length > 0
                  ? selected.map((status) => CompanyStatuses[status as CompanyStatus]).join(', ')
                  : ''
              }
            >
              {Object.keys(CompanyStatuses).map((status) => (
                <MenuItem key={status} value={status}>
                  <Checkbox checked={companySearchData.status?.includes(status) || false} />
                  <ListItemText primary={CompanyStatuses[status as CompanyStatus]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <SearchDialogSort
          moduleOption={ModuleOptions.Companies}
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
