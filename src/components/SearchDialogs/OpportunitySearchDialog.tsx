import { Grid, SelectChangeEvent } from '@mui/material'
import SearchDialogSort from '../SearchDialogSort'
import { ModuleOptions } from '../../types/common'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { OpportunitySearchFormProps, OpportunityStatus, OpportunityType } from '../../types/opportunity'
import { ChangeEvent } from 'react'
import { updateSearchAttribute } from '../../features/search.slice'
import { OpportunitySortedByFields } from '../../consts/search'
import { getEnumTranslations } from '../../helpers/common'
import { getOpportunitySearchGridData, getOpportunitySearchLabels } from '../../transformers/opportunity'
import GridField from '../GridField'

const OpportunitySearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const opportunitySearchData = useAppSelector((state) => state.search) as OpportunitySearchFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string | string[]>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  const opportunityStatuses = getEnumTranslations(OpportunityStatus, t, 'opportunities:opportunityStatuses')
  const opportunityTypes = getEnumTranslations(OpportunityType, t, 'opportunities:opportunityTypes')

  const labels = getOpportunitySearchLabels(t)
  const opportunitySearchGridData = getOpportunitySearchGridData(
    opportunitySearchData,
    opportunityStatuses,
    opportunityTypes,
  )

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = opportunitySearchGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
        })}
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
