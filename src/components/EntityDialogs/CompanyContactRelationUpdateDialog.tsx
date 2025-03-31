import { ChangeEvent, FC, useState } from 'react'
import { CompanyContactRelationType, UpdateCompanyContactRelation } from '../../types/contact'
import { useTranslation } from 'react-i18next'
import { useGetCompaniesQuery } from '../../app/apis/company.api'
import { getAutocompleteHashMapFromEntityData } from '../../helpers/common'
import { useUpdateCompanyContractRelationMutation } from '../../app/apis/company-contact-relation.api'
import { useAppDispatch } from '../../app/hooks'
import { Button, Grid, SelectChangeEvent } from '@mui/material'
import { hideConfirm } from '../../features/confirm.slice'
import Spinner from '../Spinner'
import { CompanyContactRelationTypes } from '../../consts/contact'
import {
  getUpdateContactRelationDialogFormGridData,
  getUpdateContactRelationDialogFormLabels,
} from '../../transformers/contact'
import GridField from '../GridField'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException } from '../../types/common'

const CompanyContactRelationUpdateDialog: FC<{
  relationId: number
  relationType: CompanyContactRelationType
  companyId: number
}> = ({ relationId, relationType, companyId }) => {
  const { t } = useTranslation()
  const { data: companies } = useGetCompaniesQuery('', {
    selectFromResult: ({ data }) => ({
      data: data?.map(({ id, name }) => ({ id, name })) || [],
    }),
  })
  const companiesMap = getAutocompleteHashMapFromEntityData(companies, 'name', 'id')

  const [updateCompanyContractRelation, { isLoading: isLoadingUpdateCompanyContractRelation }] =
    useUpdateCompanyContractRelationMutation()

  const [relationData, setRelationData] = useState<Partial<UpdateCompanyContactRelation>>({
    companyId,
    relationType,
  })

  const dispatch = useAppDispatch()

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string>,
  ) => {
    const { name, value } = event.target
    setRelationData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleRelationUpdate = async () => {
    const updateRelationData: UpdateCompanyContactRelation = {
      relationType: relationData.relationType as CompanyContactRelationType,
      companyId: Number(relationData.companyId),
    }

    try {
      const response = await updateCompanyContractRelation({ id: relationId, relation: updateRelationData }).unwrap()
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

  if (isLoadingUpdateCompanyContractRelation) {
    return <Spinner />
  }

  const companyContactRelationTypesOptions = Object.keys(CompanyContactRelationTypes).map((mode) =>
    t(`contacts:companyContactRelationType.${mode}`),
  )

  const labels = getUpdateContactRelationDialogFormLabels(t)

  const updateRelationGridData = getUpdateContactRelationDialogFormGridData(
    relationData as UpdateCompanyContactRelation,
    companyContactRelationTypesOptions,
    Object.values(CompanyContactRelationTypes),
    companiesMap,
  )

  return (
    <Grid>
      <Grid container item sx={{ width: '100%' }}>
        {labels.map((label) => {
          const gridFieldData = updateRelationGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
        })}
      </Grid>
      <Grid sx={{ mt: 3, width: '100%', display: 'flex', flexDirection: 'row', gap: 1 }}>
        <Button sx={{ width: '49%' }} onClick={handleRelationUpdate} color='primary'>
          {t('general:edit')}
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

export default CompanyContactRelationUpdateDialog
