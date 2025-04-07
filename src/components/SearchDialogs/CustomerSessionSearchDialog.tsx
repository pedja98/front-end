import Grid from '@mui/material/Grid'
import { SelectChangeEvent } from '@mui/material'
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
import { getCustomerSessionSearchGridData, getCustomerSessionSearchLabels } from '../../transformers/customerSession'
import GridField from '../GridField'

const CustomerSessionSearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const customerSessionSearchData = useAppSelector((state) => state.search) as CustomerSessionSearchFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string | string[]>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  const customerSessionModes = getEnumTranslations(CustomerSessionMode, t, 'customerSessions:customerSessionModes')
  const customerSessionOutcomes = getEnumTranslations(
    CustomerSessionOutcome,
    t,
    'customerSessions:customerSessionOutcomes',
  )
  const customerSessionStatuses = getEnumTranslations(
    CustomerSessionStatus,
    t,
    'customerSessions:customerSessionsStatuses',
  )
  const customerSessionTypes = getEnumTranslations(CustomerSessionType, t, 'customerSessions:customerSessionTypes')

  const labels = getCustomerSessionSearchLabels(t)
  const customerSessionSearchGridData = getCustomerSessionSearchGridData(
    customerSessionSearchData,
    customerSessionStatuses,
    customerSessionModes,
    customerSessionTypes,
    customerSessionOutcomes,
  )

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = customerSessionSearchGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
        })}
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
