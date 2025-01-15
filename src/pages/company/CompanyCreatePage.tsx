import Grid from '@mui/material/Grid'
import { Button, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException } from '../../types/exception'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { Company } from '../../types/company'
import { useCreateCompanyMutation } from '../../app/apis/company.api'
import { GridFieldTypes } from '../../consts/common'
import { getCreateCompanyGridData } from '../../transformers/company'

const CompanyCreatePage = () => {
  const [companyData, setCompanyData] = useState<Partial<Company>>({
    name: '',
    hqAddress: '',
    industry: '',
    contactPhone: '',
    numberOfEmployees: undefined,
    tin: undefined,
    bankName: '',
    bankAccountNumber: '',
    comment: '',
  })

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [createCompany, { isLoading }] = useCreateCompanyMutation()

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: isNaN(Number(value)) || !value ? value : Number(value),
    }))
  }

  const handleSave = async () => {
    if (Object.values(companyData).some((value) => !String(value).trim())) {
      dispatch(
        setNotification({
          text: t('fillAllFields'),
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

    if (isNaN(Number(companyData.numberOfEmployees))) {
      dispatch(
        setNotification({
          text: t('invalidFieldValueFormat', { fieldName: t('company:numberOfEmployees') }),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    try {
      const response = await createCompany(companyData).unwrap()
      const messageCode = `company:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(`/index/companies`)
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

  if (isLoading) {
    return <Spinner />
  }

  const labels = [
    { label: t('company:name'), key: 'name' },
    { label: t('company:hqAddress'), key: 'hqAddress' },
    { label: t('company:industry'), key: 'industry' },
    { label: t('company:contactPhone'), key: 'contactPhone' },
    { label: t('company:numberOfEmployees'), key: 'numberOfEmployees' },
    { label: t('company:tin'), key: 'tin' },
    { label: t('company:bankName'), key: 'bankName' },
    { label: t('company:bankAccountNumber'), key: 'bankAccountNumber' },
    { label: t('company:comment'), key: 'comment' },
  ]

  const createCompanyGridData = getCreateCompanyGridData()

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>{t('company:createCompanyLabel')}</Typography>
      </Grid>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = createCompanyGridData[label.key]
          if (gridFieldData.type === GridFieldTypes.STRING || gridFieldData.type === GridFieldTypes.NUMBER) {
            return (
              <Grid item sx={{ width: '100%' }} key={label.key}>
                <TextField
                  id={label.key}
                  name={label.key}
                  label={label.label}
                  variant='standard'
                  value={String(companyData[label.key as keyof Company] || '')}
                  sx={{ width: '100%' }}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleChange(event)
                  }}
                />
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

export default CompanyCreatePage
