import Grid from '@mui/material/Grid'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException } from '../../types/exception'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { SaveCompanyDto } from '../../types/company'
import { useUpdateCompanyMutation, useGetCompanyQuery } from '../../app/apis/company.api'
import { GridFieldTypes } from '../../consts/common'
import { getSaveCompanyGridData } from '../../transformers/company'
import { GridFieldType } from '../../types/common'
import { useGetAssignedToUserDataQuery } from '../../app/apis/user.api'

const CompanyEditPage = () => {
  const [companyData, setCompanyData] = useState<Partial<SaveCompanyDto>>({
    name: '',
    hqAddress: '',
    industry: '',
    contactPhone: '',
    numberOfEmployees: undefined,
    tin: undefined,
    bankName: '',
    bankAccountNumber: '',
    comment: '',
    assignedTo: undefined,
    temporaryAssignedTo: undefined,
  })

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const companyId = Number(params.id)

  const {
    data: assignedToUserData,
    isLoading: isLoadingGetAssignedToUserData,
    isError: isErrorGetAssignedToUserData,
    error: errorGetAssignedToUserData,
  } = useGetAssignedToUserDataQuery()

  const {
    data: getCompanyData,
    isLoading: isLoadingGetCompany,
    isError: isErrorGetCompany,
    error: errorGetCompany,
  } = useGetCompanyQuery(companyId)

  useEffect(() => {
    if (getCompanyData) {
      setCompanyData({
        name: getCompanyData.name,
        hqAddress: getCompanyData.hqAddress,
        industry: getCompanyData.industry,
        contactPhone: getCompanyData.contactPhone,
        numberOfEmployees: getCompanyData.numberOfEmployees,
        tin: getCompanyData.tin,
        bankName: getCompanyData.bankName,
        bankAccountNumber: getCompanyData.bankAccountNumber,
        comment: getCompanyData.comment,
        assignedTo: getCompanyData.assignedToId,
        temporaryAssignedTo: getCompanyData.temporaryAssignedToId || undefined,
      })
    }
  }, [getCompanyData])

  const [updateCompany, { isLoading: isLoadingUpdateCompany }] = useUpdateCompanyMutation()

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: isNaN(Number(value)) || !value ? value : Number(value),
    }))
  }

  const handleSave = async () => {
    if (
      Object.keys(companyData).some(
        (key) =>
          createCompanyGridData[key as keyof SaveCompanyDto]?.required &&
          !String(companyData[key as keyof SaveCompanyDto] || '').trim(),
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
          text: t('company:assignedToSameAsTemporary'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (isNaN(Number(companyData.tin))) {
      dispatch(
        setNotification({
          text: t('invalidFieldValueFormat', { fieldName: t('company:tin') }),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (
      companyData.numberOfEmployees !== null &&
      companyData.numberOfEmployees !== undefined &&
      isNaN(Number(companyData.numberOfEmployees))
    ) {
      dispatch(
        setNotification({
          text: t('invalidFieldValueFormat', { fieldName: t('company:numberOfEmployees') }),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    try {
      const response = await updateCompany({ id: companyId, company: companyData }).unwrap()
      const messageCode = `company:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(`/index/companies/${companyId}`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `company:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  if (isLoadingUpdateCompany || isLoadingGetAssignedToUserData || isLoadingGetCompany) {
    return <Spinner />
  }

  if (
    isErrorGetAssignedToUserData ||
    !assignedToUserData ||
    !assignedToUserData ||
    !getCompanyData ||
    isErrorGetCompany
  ) {
    dispatch(
      setNotification({
        text: JSON.stringify(errorGetAssignedToUserData || errorGetCompany),
        type: NotificationType.Error,
      }),
    )
    navigate(`/index/companies/${companyId}`)
    return null
  }

  const labels = [
    { label: t('company:name'), key: 'name' },
    { label: t('company:hqAddress'), key: 'hqAddress' },
    { label: t('company:industry'), key: 'industry' },
    { label: t('company:contactPhone'), key: 'contactPhone' },
    { label: t('company:tin'), key: 'tin' },
    { label: t('company:numberOfEmployees'), key: 'numberOfEmployees' },
    { label: t('company:bankName'), key: 'bankName' },
    { label: t('company:bankAccountNumber'), key: 'bankAccountNumber' },
    { label: t('company:assignedTo'), key: 'assignedTo' },
    { label: t('company:temporaryAssignedTo'), key: 'temporaryAssignedTo' },
    { label: t('company:comment'), key: 'comment' },
  ]

  const assignedToUserDataWithEmptyValue = [{ id: undefined, username: t('none') }, ...assignedToUserData]

  const createCompanyGridData = getSaveCompanyGridData(
    assignedToUserDataWithEmptyValue?.map((user) => user.id),
    assignedToUserDataWithEmptyValue?.map((user) => user.username),
  )

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>{t('company:editCompanyLabel')}</Typography>
      </Grid>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = createCompanyGridData[label.key]
          if (
            ([GridFieldTypes.STRING, GridFieldTypes.NUMBER, GridFieldTypes.AREA] as GridFieldType[]).includes(
              gridFieldData.type,
            )
          ) {
            const isArea = gridFieldData.type === GridFieldTypes.AREA
            return (
              <Grid item sx={{ width: '100%' }} key={label.key}>
                <TextField
                  id={label.key}
                  name={label.key}
                  label={label.label}
                  variant='standard'
                  required={!!gridFieldData.required}
                  value={String(companyData[label.key as keyof SaveCompanyDto] || '')}
                  sx={{ width: '100%' }}
                  minRows={isArea ? 4 : 0}
                  multiline={isArea}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleChange(event)
                  }}
                />
              </Grid>
            )
          }
          if (gridFieldData.type === GridFieldTypes.SELECT && gridFieldData?.options) {
            return (
              <Grid item sx={{ width: '100%', mb: 1 }} key={label.key}>
                <FormControl sx={{ width: '100%' }} variant='standard'>
                  <InputLabel id={label.key} sx={{ pl: 9.3 }} required={gridFieldData.required}>
                    {label.label}
                  </InputLabel>
                  <Select
                    labelId={label.key}
                    id={label.key}
                    name={label.key}
                    value={String(companyData[label.key as keyof SaveCompanyDto])}
                    variant='standard'
                    sx={{ width: '100%' }}
                    onChange={(event: SelectChangeEvent<string>) => {
                      handleChange(event)
                    }}
                  >
                    {gridFieldData?.options.map((option, index) => (
                      <MenuItem key={index} value={gridFieldData?.optionsValues?.[index] ?? undefined}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )
          }
          return <Grid key={label.key}></Grid>
        })}
        <Grid item sx={{ width: '100%' }}>
          <Button sx={{ width: '100%' }} onClick={handleSave}>
            {t('general:saveButtonText')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CompanyEditPage
