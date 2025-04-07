import Grid from '@mui/material/Grid'
import { SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateSearchAttribute } from '../../features/search.slice'
import { ContactSortedByFields } from '../../consts/search'
import SearchDialogSort from '../SearchDialogSort'
import { ContactDocumentType, ContactSearchFormProps } from '../../types/contact'
import { ModuleOptions } from '../../types/common'
import { getEnumTranslations } from '../../helpers/common'
import { getContactSearchGridData, getContactSearchLabels } from '../../transformers/contact'
import GridField from '../GridField'

const ContactSearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const contactSearchData = useAppSelector((state) => state.search) as ContactSearchFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string | string[]>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  const labels = getContactSearchLabels(t)
  const contactSearchGridData = getContactSearchGridData(
    contactSearchData,
    getEnumTranslations(ContactDocumentType, t, 'contacts:documentTypes'),
  )

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = contactSearchGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
        })}
        <SearchDialogSort
          moduleOption={ModuleOptions.Contacts}
          sortByFields={ContactSortedByFields}
          sortByValue={contactSearchData.sortBy}
          sortOrder={contactSearchData.sortOrder}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  )
}

export default ContactSearchDialog
