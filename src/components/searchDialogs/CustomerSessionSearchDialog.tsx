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
import { ModulesOptions } from '../../types/common'
import {
  CustomerSessionMode,
  CustomerSessionOutcome,
  CustomerSessionSearchFormProps,
  CustomerSessionStatus,
  CustomerSessionType,
} from '../../types/customerSession'
import { useTranslation } from 'react-i18next'
import {
  CustomerSessionModes,
  CustomerSessionOutcomes,
  CustomerSessionStatuses,
  CustomerSessionTypes,
} from '../../consts/customerSession'

const CustomerSessionSearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const customerSessionSearchData = useAppSelector((state) => state.search) as CustomerSessionSearchFormProps

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
                  ? selected.map((status) => CustomerSessionStatuses[status as CustomerSessionStatus]).join(', ')
                  : ''
              }
            >
              {Object.keys(CustomerSessionStatuses).map((status) => (
                <MenuItem key={status} value={status}>
                  <Checkbox checked={customerSessionSearchData.status?.includes(status) || false} />
                  <ListItemText primary={CustomerSessionStatuses[status as CustomerSessionStatus]} />
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
                  ? selected.map((mode) => CustomerSessionModes[mode as CustomerSessionMode]).join(', ')
                  : ''
              }
            >
              {Object.keys(CustomerSessionModes).map((mode) => (
                <MenuItem key={mode} value={mode}>
                  <Checkbox checked={customerSessionSearchData.mode?.includes(mode) || false} />
                  <ListItemText primary={CustomerSessionModes[mode as CustomerSessionMode]} />
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
                  ? selected.map((type) => CustomerSessionTypes[type as CustomerSessionType]).join(', ')
                  : ''
              }
            >
              {Object.keys(CustomerSessionTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={customerSessionSearchData.type?.includes(type) || false} />
                  <ListItemText primary={CustomerSessionTypes[type as CustomerSessionType]} />
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
                  ? selected.map((outcome) => CustomerSessionOutcomes[outcome as CustomerSessionOutcome]).join(', ')
                  : ''
              }
            >
              {Object.keys(CustomerSessionOutcomes).map((outcome) => (
                <MenuItem key={outcome} value={outcome}>
                  <Checkbox checked={customerSessionSearchData.outcome?.includes(outcome) || false} />
                  <ListItemText primary={CustomerSessionOutcomes[outcome as CustomerSessionOutcome]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <SearchDialogSort
          moduleOption={ModulesOptions.CustomerSessions}
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
