import React, { FC, useState } from 'react'
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Grid,
} from '@mui/material'
import { CompanyContactRelationTypes } from '../../consts/contact'
import { CompanyContactRelationType, CreateCompanyContactRelation } from '../../types/contact'
import { useTranslation } from 'react-i18next'
import { useGetCompaniesQuery } from '../../app/apis/crm/company.api'
import { getAutocompleteHashMapFromEntityData } from '../../helpers/common'
import { ChangeEvent } from 'react'
import { useCreateCompanyContractRelationMutation } from '../../app/apis/crm/company-contact-relation.api'
import { useAppDispatch } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException } from '../../types/common'
import Spinner from '../Spinner'
import { hideConfirm } from '../../features/confirm.slice'

const CompanyContactRelationCreateDialog: FC<{ contactId: number }> = ({ contactId }) => {
  const { t } = useTranslation()
  const { data: companies } = useGetCompaniesQuery('', {
    selectFromResult: ({ data }) => ({
      data: data?.map(({ id, name }) => ({ id, name })) || [],
    }),
  })
  const companiesMap = getAutocompleteHashMapFromEntityData(companies, 'name', 'id')

  const [createCompanyContractRelation, { isLoading: isLoadingCreateCompanyContractRelation }] =
    useCreateCompanyContractRelationMutation()

  const [relationData, setRelationData] = useState<Partial<CreateCompanyContactRelation>>({
    contactId,
    companyId: undefined,
    relationTypes: [],
  })

  const dispatch = useAppDispatch()

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string | string[]>,
  ) => {
    const { name, value } = event.target
    setRelationData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleRelationCreate = async () => {
    const createRelationData: CreateCompanyContactRelation = {
      contactId: Number(contactId),
      relationTypes: relationData.relationTypes as CompanyContactRelationType[],
      companyId: Number(relationData.companyId),
    }

    try {
      const response = await createCompanyContractRelation(createRelationData).unwrap()
      const messageCode = `contacts:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `contacts:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    } finally {
      dispatch(hideConfirm())
    }
  }

  if (isLoadingCreateCompanyContractRelation) {
    return <Spinner />
  }

  return (
    <Grid>
      <Grid>
        <FormControl sx={{ width: '100%', mb: 2 }} variant='standard'>
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
                ? selected.map((type) => t(`contacts:companyContactRelationType.${type}`)).join(', ')
                : ''
            }
          >
            {Object.keys(CompanyContactRelationTypes).map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={relationData.relationTypes?.includes(type as CompanyContactRelationType) || false} />
                <ListItemText primary={t(`contacts:companyContactRelationType.${type}`)} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid sx={{ mt: 3, width: '100%', display: 'flex', flexDirection: 'row', gap: 1 }}>
        <Button sx={{ width: '49%' }} onClick={handleRelationCreate} color='primary'>
          {t('general:create')}
        </Button>
        <Button
          sx={{ width: '49%' }}
          onClick={() => {
            dispatch(hideConfirm())
          }}
          color='primary'
        >
          {t('general:close')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default CompanyContactRelationCreateDialog
