import Grid from '@mui/material/Grid'
import { SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateSearchAttribute } from '../../features/search.slice'
import { CompanySortedByFields } from '../../consts/search'
import { CompanyStatus, SearchCompanyDataFormProps } from '../../types/company'
import SearchDialogSort from '../SearchDialogSort'
import { ModuleOptions } from '../../types/common'
import { getEnumTranslations } from '../../helpers/common'
import { getCompanySearchGridData, getCompanySearchLabels } from '../../transformers/company'
import GridField from '../GridField'

const CompanySearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const companySearchData = useAppSelector((state) => state.search) as SearchCompanyDataFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string | string[]>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  const labels = getCompanySearchLabels(t)
  const companySearchGridData = getCompanySearchGridData(
    companySearchData,
    getEnumTranslations(CompanyStatus, t, 'companies:statuses'),
  )

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = companySearchGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
        })}
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
