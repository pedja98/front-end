import Grid from '@mui/material/Grid'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Checkbox,
  ListItemText,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateSearchAttribute } from '../../features/search.slice'
import { ContactSortedByFields } from '../../consts/search'
import SearchDialogSort from '../SearchDialogSort'
import { ContactDocumentType, ContactSearchFormProps } from '../../types/contact'
import { ModuleOptions } from '../../types/common'
import { getEnumTranslations } from '../../helpers/common'

const ContactSearchDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const contactSearchData = useAppSelector((state) => state.search) as ContactSearchFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string>,
  ) => {
    dispatch(updateSearchAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  const documentTypes = getEnumTranslations(ContactDocumentType, t, 'contacts:documentTypes')

  return (
    <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            id='first-name'
            name='firstName'
            label={t('contacts:firstName')}
            variant='standard'
            value={contactSearchData.firstName || ''}
            sx={{ width: '100%' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            sx={{ width: '100%' }}
            id='last-name'
            name='lastName'
            label={t('contacts:lastName')}
            variant='standard'
            value={contactSearchData.lastName || ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            sx={{ width: '100%' }}
            id='email'
            name='email'
            label={t('contacts:email')}
            variant='standard'
            value={contactSearchData.email || ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            sx={{ width: '100%' }}
            id='phone'
            name='phone'
            label={t('contacts:phone')}
            variant='standard'
            value={contactSearchData.phone || ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel id='document-type-select-label' sx={{ pl: 2 }}>
              {t('contacts:documentType')}
            </InputLabel>
            <Select
              labelId='document-type-select-label'
              id='document-type'
              variant='standard'
              name='documentType'
              multiple
              value={contactSearchData.documentType || []}
              onChange={(event: SelectChangeEvent<string[]>) => {
                handleChange(event)
              }}
              renderValue={(selected) =>
                selected && selected.length > 0
                  ? selected.map((type) => documentTypes[type as ContactDocumentType]).join(', ')
                  : ''
              }
            >
              {Object.keys(documentTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={contactSearchData.documentType?.includes(type) || false} />
                  <ListItemText primary={documentTypes[type as ContactDocumentType]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            sx={{ width: '100%' }}
            id='documentId'
            name='documentId'
            label={t('contacts:documentId')}
            variant='standard'
            value={contactSearchData.documentId || ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChange(event)
            }}
          />
        </Grid>
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
