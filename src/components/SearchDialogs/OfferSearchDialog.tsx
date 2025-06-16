import { Grid, SelectChangeEvent } from '@mui/material'
import SearchDialogSort from '../SearchDialogSort'
import { ModuleOptions } from '../../types/common'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ChangeEvent } from 'react'
import { updateSearchAttribute } from '../../features/search.slice'
import { OfferStatus } from '../../types/offer'
import { getEnumTranslations } from '../../helpers/common'
import GridField from '../GridField'
import { OfferSortedByFields } from '../../consts/search'
import { getOfferSearchLabels, getOfferSearchGridData } from '../../transformers/offer'
import { OfferSearchFormProps } from '../../types/offer'

const OfferSearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const offerSearchData = useAppSelector((state) => state.search) as unknown as OfferSearchFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string | string[]>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  const offerStatuses = getEnumTranslations(OfferStatus, t, 'offers:statuses')
  const labels = getOfferSearchLabels(t)
  const offerSearchGridData = getOfferSearchGridData(offerSearchData, offerStatuses)

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = offerSearchGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
        })}
        <SearchDialogSort
          moduleOption={ModuleOptions.Offers}
          sortByFields={OfferSortedByFields}
          sortByValue={offerSearchData.sortBy}
          sortOrder={offerSearchData.sortOrder}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  )
}

export default OfferSearchDialog
