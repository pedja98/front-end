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
import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateSearchAttribute } from '../../features/search.slice'
import { CustomerSessionSortedByFields } from '../../consts/search'
import SearchDialogSort from '../SearchDialogSort'
import { ModuleOptions } from '../../types/common'
import {
  CustomerSessionMode,
  CustomerSessionOutcome,
  CustomerSessionSearchFormProps,
  CustomerSessionStatus,
  CustomerSessionType,
} from '../../types/customerSession'
import { useTranslation } from 'react-i18next'
import { getEnumTranslations } from '../../helpers/common'

const CustomerSessionSearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const customerSessionSearchData = useAppSelector((state) => state.search) as CustomerSessionSearchFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  const customerSessionModes = getEnumTranslations(CustomerSessionMode, t, 'customerSessions:customerSessionsStatuses')
  const customerSessionOutcomes = getEnumTranslations(
    CustomerSessionOutcome,
    t,
    'customerSessions:customerSessionsStatuses',
  )
  const customerSessionStatuses = getEnumTranslations(
    CustomerSessionStatus,
    t,
    'customerSessions:customerSessionsStatuses',
  )
  const customerSessionTypes = getEnumTranslations(CustomerSessionType, t, 'customerSessions:customerSessionsStatuses')

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            id='name'
            name='name'
            label={t('customerSessions:name')}
            variant='standard'
            value={customerSessionSearchData.name || ''}
            sx={{ width: '100%' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='customer-session-status-select-label' sx={{ pl: 2 }}>
              {t('customerSessions:status')}
            </InputLabel>
            <Select
              labelId='customer-sessions-status-select-label'
              id='customer-sessions-status'
              variant='standard'
              name='status'
              multiple
              value={customerSessionSearchData.status || []}
              onChange={(event: SelectChangeEvent<string[]>) => {
                handleChange(event)
              }}
              renderValue={(selected) =>
                selected && selected.length > 0
                  ? selected.map((status) => customerSessionStatuses[status as CustomerSessionStatus]).join(', ')
                  : ''
              }
            >
              {Object.keys(customerSessionStatuses).map((status) => (
                <MenuItem key={status} value={status}>
                  <Checkbox checked={customerSessionSearchData.status?.includes(status) || false} />
                  <ListItemText primary={customerSessionStatuses[status as CustomerSessionStatus]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='customer-session-status-select-label' sx={{ pl: 2 }}>
              {t('customerSessions:mode')}
            </InputLabel>
            <Select
              labelId='customer-sessions-mode-select-label'
              id='customer-sessions-mode'
              variant='standard'
              name='mode'
              multiple
              value={customerSessionSearchData.mode || []}
              onChange={(event: SelectChangeEvent<string[]>) => {
                handleChange(event)
              }}
              renderValue={(selected) =>
                selected && selected.length > 0
                  ? selected.map((mode) => customerSessionModes[mode as CustomerSessionMode]).join(', ')
                  : ''
              }
            >
              {Object.keys(customerSessionModes).map((mode) => (
                <MenuItem key={mode} value={mode}>
                  <Checkbox checked={customerSessionSearchData.mode?.includes(mode) || false} />
                  <ListItemText primary={customerSessionModes[mode as CustomerSessionMode]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='customer-session-type-select-label' sx={{ pl: 2 }}>
              {t('customerSessions:type')}
            </InputLabel>
            <Select
              labelId='customer-sessions-type-select-label'
              id='customer-sessions-type'
              variant='standard'
              name='type'
              multiple
              value={customerSessionSearchData.type || []}
              onChange={(event: SelectChangeEvent<string[]>) => {
                handleChange(event)
              }}
              renderValue={(selected) =>
                selected && selected.length > 0
                  ? selected.map((type) => customerSessionTypes[type as CustomerSessionType]).join(', ')
                  : ''
              }
            >
              {Object.keys(customerSessionTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={customerSessionSearchData.type?.includes(type) || false} />
                  <ListItemText primary={customerSessionTypes[type as CustomerSessionType]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='customer-session-outcome-select-label' sx={{ pl: 2 }}>
              {t('customerSessions:outcome')}
            </InputLabel>
            <Select
              labelId='customer-sessions-outcome-select-label'
              id='customer-sessions-outcome'
              variant='standard'
              name='outcome'
              multiple
              value={customerSessionSearchData.outcome || []}
              onChange={(event: SelectChangeEvent<string[]>) => {
                handleChange(event)
              }}
              renderValue={(selected) =>
                selected && selected.length > 0
                  ? selected.map((outcome) => customerSessionOutcomes[outcome as CustomerSessionOutcome]).join(', ')
                  : ''
              }
            >
              {Object.keys(customerSessionOutcomes).map((outcome) => (
                <MenuItem key={outcome} value={outcome}>
                  <Checkbox checked={customerSessionSearchData.outcome?.includes(outcome) || false} />
                  <ListItemText primary={customerSessionOutcomes[outcome as CustomerSessionOutcome]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <SearchDialogSort
          moduleOption={ModuleOptions.CustomerSessions}
          sortByFields={CustomerSessionSortedByFields}
          sortByValue={customerSessionSearchData.sortBy}
          sortOrder={customerSessionSearchData.sortOrder}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  )
}

export default CustomerSessionSearchDialog
