import {
  Autocomplete,
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
import { CompanyContactRelationTypes } from '../../consts/contact'
import { CompanyContactRelationFormProps, CompanyContactRelationType } from '../../types/contact'
import { useTranslation } from 'react-i18next'
import { useGetCompaniesQuery } from '../../app/apis/company.api'
import { getAutocompleteHashMapFromEntityData } from '../../helpers/common'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ChangeEvent } from 'react'
import { updateEntityAttribute } from '../../features/entity.slice'

const CompanyContactRelationEntityDialog = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { data: companies } = useGetCompaniesQuery('', {
    selectFromResult: ({ data }) => ({
      data: data?.map(({ id, name }) => ({ id, name })) || [],
    }),
  })
  const companiesMap = getAutocompleteHashMapFromEntityData(companies, 'name', 'id')
  const relationData = useAppSelector((state) => state.entity) as CompanyContactRelationFormProps

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string>,
  ) => {
    dispatch(updateEntityAttribute({ attribute: event.target.name, value: event.target.value }))
  }

  return (
    <Grid item sx={{ width: '100%' }}>
      <FormControl sx={{ width: '100%' }} variant='standard'>
        <Autocomplete
          id='company-autocomplete'
          value={
            Object.keys(companiesMap || {}).find(
              (key) => (companiesMap || {})?.[key] === Number(relationData.companyId),
            ) || null
          }
          options={Object.keys(companiesMap || {})}
          getOptionLabel={(option) => (option !== undefined ? String(option) : '')}
          onChange={(_, key) => {
            handleChange({
              target: { name: 'companyId', value: companiesMap?.[String(key)] },
            } as ChangeEvent<HTMLInputElement>)
          }}
          renderInput={(params) => (
            <TextField {...params} label={t('contacts:relatedCompany')} variant='standard' required={true} />
          )}
          isOptionEqualToValue={(option, value) => option === value}
          sx={{ width: '100%' }}
        />
      </FormControl>
      <FormControl sx={{ width: '100%' }} variant='standard'>
        <InputLabel id='relation-select-label' sx={{ pl: 2.5 }}>
          {t('contacts:companyRelationType')}
        </InputLabel>
        <Select
          labelId='relation-select-label'
          id='relation-types'
          variant='standard'
          name='relationTypes'
          multiple
          value={relationData.relationTypes || []}
          onChange={(event: SelectChangeEvent<string[]>) => {
            handleChange(event)
          }}
          renderValue={(selected) =>
            selected && selected.length > 0
              ? selected.map((type) => CompanyContactRelationTypes[type as CompanyContactRelationType]).join(', ')
              : ''
          }
        >
          {Object.keys(CompanyContactRelationTypes).map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={relationData.relationTypes?.includes(type) || false} />
              <ListItemText primary={CompanyContactRelationTypes[type as CompanyContactRelationType]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default CompanyContactRelationEntityDialog
