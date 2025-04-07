import Grid from '@mui/material/Grid'
import { Button, SelectChangeEvent, Typography } from '@mui/material'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException, AutocompleteEntity } from '../../types/common'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { SaveCompany } from '../../types/company'
import { useCreateCompanyMutation, useGetCompanyQuery, useUpdateCompanyMutation } from '../../app/apis/company.api'
import { getCompanySaveLabels, getSaveCompanyGridData } from '../../transformers/company'
import { useGetAssignedToUserDataQuery } from '../../app/apis/user.api'
import { UserType } from '../../types/user'
import { SaveCompanyFormInitialState } from '../../consts/company'
import { getAutocompleteHashMapFromEntityData } from '../../helpers/common'
import GridField from '../../components/GridField'

const CompanySavePage = () => {
  const [companyData, setCompanyData] = useState<Partial<SaveCompany>>(SaveCompanyFormInitialState)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    data: assignedToUserData,
    isLoading: isLoadingGetAssignedToUserData,
    isError: isErrorGetAssignedToUserData,
    error: errorGetAssignedToUserData,
  } = useGetAssignedToUserDataQuery(UserType.SALESMAN)

  const params = useParams()
  const companyId = params.id ? Number(params.id) : undefined

  const {
    data: getCompanyData,
    isLoading: isLoadingGetCompany,
    isError: isErrorGetCompany,
    error: errorGetCompany,
  } = useGetCompanyQuery(companyId as number, { skip: !companyId })

  const [updateCompany, { isLoading: isLoadingUpdateCompany }] = useUpdateCompanyMutation()

  const [createCompany, { isLoading: isLoadingCreateCompany }] = useCreateCompanyMutation()

  useEffect(() => {
    if (getCompanyData) {
      setCompanyData({
        ...getCompanyData,
        assignedTo: getCompanyData.assignedToId,
        temporaryAssignedTo: getCompanyData.temporaryAssignedToId,
      })
    }
  }, [getCompanyData])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => {
    const { name, value } = event.target
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: isNaN(Number(value)) || !value ? value : Number(value),
    }))
  }, [])

  const handleSave = async () => {
    if (
      Object.keys(companyData).some(
        (key) =>
          saveCompanyGridData[key as keyof SaveCompany]?.required &&
          !String(companyData[key as keyof SaveCompany] || '').trim(),
      )
    ) {
      dispatch(
        setNotification({
          text: t('fillAllRequiredFields'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (companyData.assignedTo === companyData.temporaryAssignedTo) {
      dispatch(
        setNotification({
          text: t('companies:assignedToSameAsTemporary'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (isNaN(Number(companyData.tin))) {
      dispatch(
        setNotification({
          text: t('invalidFieldValueFormat', { fieldName: t('companies:tin') }),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (companyData.numberOfEmployees && isNaN(Number(companyData.numberOfEmployees))) {
      dispatch(
        setNotification({
          text: t('invalidFieldValueFormat', { fieldName: t('companies:numberOfEmployees') }),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    try {
      const response = companyId
        ? await updateCompany({ id: Number(companyId), company: companyData }).unwrap()
        : await createCompany(companyData).unwrap()
      const messageCode = `companies:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(companyId ? `/index/companies/${companyId}` : `/index/companies`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `companies:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  if (isLoadingCreateCompany || isLoadingGetAssignedToUserData || isLoadingGetCompany || isLoadingUpdateCompany) {
    return <Spinner />
  }

  if (isErrorGetAssignedToUserData || !assignedToUserData || isErrorGetCompany) {
    dispatch(
      setNotification({
        text: JSON.stringify(errorGetAssignedToUserData || errorGetCompany),
        type: NotificationType.Error,
      }),
    )
    navigate(companyId ? `/index/companies/${companyId}` : `/index/companies`)
    return null
  }

  const labels = getCompanySaveLabels(t)

  const saveCompanyGridData = getSaveCompanyGridData(
    companyData,
    getAutocompleteHashMapFromEntityData(assignedToUserData as unknown as AutocompleteEntity[], 'username', 'id'),
  )

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      {!companyId && (
        <Grid item sx={{ width: '80%', mb: 2 }}>
          <Typography variant='h4'>{t('companies:createCompanyLabel').toUpperCase()}</Typography>
        </Grid>
      )}
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = saveCompanyGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
        })}
        <Grid item sx={{ width: '100%' }}>
          <Button sx={{ width: '100%' }} onClick={handleSave}>
            {t('general:saveButtonLabel')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CompanySavePage
