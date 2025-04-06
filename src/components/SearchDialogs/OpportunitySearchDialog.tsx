import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import SearchDialogSort from '../SearchDialogSort'
import { ModuleOptions } from '../../types/common'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { OpportunitySearchFormProps, OpportunityStatus, OpportunityType } from '../../types/opportunity'
import { ChangeEvent } from 'react'
import { updateSearchAttribute } from '../../features/search.slice'
import { OpportunitySortedByFields } from '../../consts/search'
import { getEnumTranslations } from '../../helpers/common'

const OpportunitySearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const opportunitySearchData = useAppSelector((state) => state.search) as OpportunitySearchFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  const opportunityStatuses = getEnumTranslations(OpportunityStatus, t, 'opportunities:opportunityStatuses')
  const opportunityTypes = getEnumTranslations(OpportunityType, t, 'opportunities:opportunityTypes')

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            id='name'
            name='name'
            label={t('opportunities:name')}
            variant='standard'
            value={opportunitySearchData.name || ''}
            sx={{ width: '100%' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='opportunity-types-select-label' sx={{ pl: 2 }}>
              {t('opportunities:types')}
            </InputLabel>
            <Select
              labelId='opportunity-types-select-label'
              id='opportunities-types'
              variant='standard'
              name='type'
              multiple
              value={opportunitySearchData.type || []}
              onChange={(event: SelectChangeEvent<string[]>) => {
                handleChange(event)
              }}
              renderValue={(selected) =>
                selected && selected.length > 0
                  ? selected.map((type) => opportunityTypes[type as OpportunityType]).join(', ')
                  : ''
              }
            >
              {Object.keys(opportunityTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={opportunitySearchData.type?.includes(type) || false} />
                  <ListItemText primary={opportunityTypes[type as OpportunityType]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='opportunity-statuses-select-label' sx={{ pl: 2 }}>
              {t('opportunities:statuses')}
            </InputLabel>
            <Select
              labelId='opportunity-statuses-select-label'
              id='opportunities-statuses'
              variant='standard'
              name='status'
              multiple
              value={opportunitySearchData.status || []}
              onChange={(event: SelectChangeEvent<string[]>) => {
                handleChange(event)
              }}
              renderValue={(selected) =>
                selected && selected.length > 0
                  ? selected.map((status) => opportunityStatuses[status as OpportunityStatus]).join(', ')
                  : ''
              }
            >
              {Object.keys(opportunityStatuses).map((status) => (
                <MenuItem key={status} value={status}>
                  <Checkbox checked={opportunitySearchData.status?.includes(status) || false} />
                  <ListItemText primary={opportunityStatuses[status as OpportunityStatus]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <SearchDialogSort
          moduleOption={ModuleOptions.Opportunities}
          sortByFields={OpportunitySortedByFields}
          sortByValue={opportunitySearchData.sortBy}
          sortOrder={opportunitySearchData.sortOrder}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  )
}

export default OpportunitySearchDialog
