import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../app/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Grid, SelectChangeEvent, Typography } from '@mui/material'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException } from '../../types/common'
import Spinner from '../../components/Spinner'
import { getAutocompleteHashMapFromEntityData } from '../../helpers/common'
import {
  CustomerSessionMode,
  CustomerSessionOutcome,
  CustomerSessionStatus,
  CustomerSessionType,
  SaveCustomerSession,
} from '../../types/customerSession'
import { SaveCustomerSessionFormInitialState } from '../../consts/customerSession'
import {
  useCreateCustomerSessionMutation,
  useGetCustomerSessionQuery,
  useUpdateCustomerSessionMutation,
} from '../../app/apis/customerSession.api'
import { getCustomerSessionSaveLabels, getSaveCustomerSessionGridData } from '../../transformers/customerSession'
import { useGetCompaniesQuery } from '../../app/apis/company.api'
import moment from 'moment'
import { transformFetchedCustomerSessionData } from '../../helpers/customerSession'
import GridField from '../../components/GridField'
import { Dayjs } from 'dayjs'

const CustomerSessionSavePage = () => {
  const [customerSessionData, setCustomerSessionData] = useState<Partial<SaveCustomerSession>>(
    SaveCustomerSessionFormInitialState,
  )

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const params = useParams()
  const customerSessionId = params.id ? params.id : undefined

  const {
    data: getCustomerSessionData,
    isLoading: isLoadingGetCustomerSession,
    isError: isErrorGetCustomerSession,
    error: errorGetCustomerSession,
  } = useGetCustomerSessionQuery(String(customerSessionId), { skip: !customerSessionId })

  const { data: companies } = useGetCompaniesQuery('', {
    selectFromResult: ({ data }) => ({
      data: data?.map(({ id, name }) => ({ id, name })) || [],
    }),
  })

  const [updateCustomerSession, { isLoading: isLoadingUpdateCustomerSession }] = useUpdateCustomerSessionMutation()

  const [createCustomerSession, { isLoading: isLoadingCreateCustomerSession }] = useCreateCustomerSessionMutation()

  const companiesMap = getAutocompleteHashMapFromEntityData(companies, 'name', 'id')

  useEffect(() => {
    setCustomerSessionData({
      ...transformFetchedCustomerSessionData(getCustomerSessionData),
    })
  }, [getCustomerSessionData])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target
    setCustomerSessionData((prevData) => ({
      ...prevData,
      [name]: isNaN(Number(value)) || !value ? value : Number(value),
    }))
  }, [])

  const handleChangeDateTimePicker = useCallback((value: Dayjs | null, name: string) => {
    setCustomerSessionData((prevData) => ({
      ...prevData,
      [name]: value && value.isValid() ? value.toISOString() : '',
    }))
  }, [])

  const handleSave = async () => {
    if (
      Object.keys(customerSessionData).some(
        (key) =>
          saveCustomerSessionGridData[key as keyof SaveCustomerSession]?.required &&
          !String(customerSessionData[key as keyof SaveCustomerSession] || '').trim(),
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

    if (new Date(customerSessionData.sessionStart as string) > new Date(customerSessionData.sessionEnd as string)) {
      dispatch(
        setNotification({
          text: t('customerSessions:invalidSessionDateTime'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    customerSessionData.name = `${customerSessionData.mode} ${Object.keys(companiesMap).find(
      (key) => companiesMap?.[key] === Number(customerSessionData.company),
    )} ${moment().format('DD-MM-YYYY')}`

    try {
      const response = customerSessionId
        ? await updateCustomerSession({ id: String(customerSessionId), customerSession: customerSessionData }).unwrap()
        : await createCustomerSession(customerSessionData).unwrap()
      const messageCode = `customerSessions:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(customerSessionId ? `/index/customer-sessions/${customerSessionId}` : `/index/customer-sessions`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `customerSessions:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  if (isLoadingCreateCustomerSession || isLoadingGetCustomerSession || isLoadingUpdateCustomerSession) {
    return <Spinner />
  }

  if (isErrorGetCustomerSession) {
    dispatch(
      setNotification({
        text: JSON.stringify(errorGetCustomerSession),
        type: NotificationType.Error,
      }),
    )
    navigate(customerSessionId ? `/index/customer-sessions/${customerSessionId}` : `/index/customer-sessions`)
    return null
  }

  const labels = getCustomerSessionSaveLabels(t)

  const customerSessionsStatusOptions = Object.keys(CustomerSessionStatus).map((status) =>
    t(`customerSessions:customerSessionsStatuses.${status}`),
  )

  const customerSessionModeOptions = Object.keys(CustomerSessionMode).map((mode) =>
    t(`customerSessions:customerSessionModes.${mode}`),
  )

  const customerSessionTypeOptions = Object.keys(CustomerSessionType).map((type) =>
    t(`customerSessions:customerSessionTypes.${type}`),
  )

  const customerSessionOutcomeOptions = Object.keys(CustomerSessionOutcome).map((outcome) =>
    t(`customerSessions:customerSessionOutcomes.${outcome}`),
  )

  const saveCustomerSessionGridData = getSaveCustomerSessionGridData(
    customerSessionData,
    customerSessionsStatusOptions,
    Object.values(CustomerSessionStatus),
    customerSessionTypeOptions,
    Object.values(CustomerSessionType),
    customerSessionModeOptions,
    Object.values(CustomerSessionMode),
    customerSessionOutcomeOptions,
    Object.values(CustomerSessionOutcome),
    companiesMap,
  )

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      {!customerSessionId && (
        <Grid item sx={{ width: '80%', mb: 2 }}>
          <Typography variant='h4'>{t('customerSessions:createCustomerSessionLabel').toUpperCase()}</Typography>
        </Grid>
      )}
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = saveCustomerSessionGridData[label.key]
          return (
            <GridField
              key={label.key}
              gridFieldData={gridFieldData}
              label={label}
              handleChange={handleChange}
              handleChangeDateTimePicker={handleChangeDateTimePicker}
            />
          )
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

export default CustomerSessionSavePage
