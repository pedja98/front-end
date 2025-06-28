import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ContractSearchFormProps, ContractStatus } from '../../types/contract'
import { ChangeEvent } from 'react'
import { Grid, SelectChangeEvent } from '@mui/material'
import { updateSearchAttribute } from '../../features/search.slice'
import { getEnumTranslations } from '../../helpers/common'
import { getContractSearchGridData, getContractSearchLabels } from '../../transformers/contract'
import GridField from '../GridField'
import SearchDialogSort from '../SearchDialogSort'
import { ModuleOptions } from '../../types/common'
import { ContractSortedByFields } from '../../consts/search'

const ContractSearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const contractSearchData = useAppSelector((state) => state.search) as unknown as ContractSearchFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string | string[]>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  const contractStatuses = getEnumTranslations(ContractStatus, t, 'contracts:statuses')
  const labels = getContractSearchLabels(t)
  const contractSearchGridData = getContractSearchGridData(contractSearchData, contractStatuses)

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = contractSearchGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
        })}
        <SearchDialogSort
          moduleOption={ModuleOptions.Contracts}
          sortByFields={ContractSortedByFields}
          sortByValue={contractSearchData.sortBy}
          sortOrder={contractSearchData.sortOrder}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  )
}

export default ContractSearchDialog
