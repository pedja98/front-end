import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../app/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException, GridFieldType } from '../../types/common'
import Spinner from '../../components/Spinner'
import { getAutocompleteHashMapFromEntityData } from '../../helpers/common'
import { GridFieldTypes } from '../../consts/common'
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
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useGetCompaniesQuery } from '../../app/apis/company.api'
import moment from 'moment'
import { transformFetchedCustomerSessionData } from '../../helpers/customerSession'

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
          <Typography variant='h4'>{t('customerSessions:createCustomerSessionLabel')}</Typography>
        </Grid>
      )}
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = saveCustomerSessionGridData[label.key]
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
                  value={String(gridFieldData.value)}
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
                    value={String(gridFieldData.value)}
                    variant='standard'
                    sx={{ width: '100%' }}
                    onChange={(event: SelectChangeEvent<string>) => {
                      handleChange(event)
                    }}
                  >
                    {gridFieldData?.options.map((option, index) => (
                      <MenuItem key={index} value={gridFieldData?.optionsValues?.[index] ?? ''}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )
          }
          if (gridFieldData.type === GridFieldTypes.AUTOCOMPLETE && gridFieldData?.autocompleteMap) {
            return (
              <Grid item sx={{ width: '100%', mb: 1 }} key={label.key}>
                <FormControl sx={{ width: '100%' }} variant='standard'>
                  <Autocomplete
                    id={label.key}
                    value={
                      Object.keys(gridFieldData.autocompleteMap || {}).find(
                        (key) =>
                          (gridFieldData.autocompleteMap || {})?.[key] ===
                          Number(customerSessionData[label.key as keyof SaveCustomerSession]),
                      ) || null
                    }
                    options={Object.keys(gridFieldData.autocompleteMap || {})}
                    getOptionLabel={(option) => {
                      return option !== undefined ? String(option) : ''
                    }}
                    onChange={(_, key) => {
                      handleChange({
                        target: { name: label.key, value: gridFieldData?.autocompleteMap?.[String(key)] },
                      } as ChangeEvent<HTMLInputElement>)
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label={label.label} variant='standard' required={gridFieldData.required} />
                    )}
                    isOptionEqualToValue={(option, value) => option === value}
                    sx={{ width: '100%' }}
                  />
                </FormControl>
              </Grid>
            )
          }
          if (gridFieldData.type === GridFieldTypes.DATE_TIME) {
            return (
              <Grid item sx={{ width: '100%', mb: 1 }} key={label.key}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    name={label.key}
                    label={label.label}
                    value={gridFieldData.value ? dayjs(gridFieldData.value) : null}
                    onChange={(newValue: Dayjs | null) => {
                      setCustomerSessionData((prevData) => ({
                        ...prevData,
                        [label.key]: newValue && newValue.isValid() ? newValue.toISOString() : '',
                      }))
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: !!gridFieldData.required,
                        id: label.key,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            )
          }
          return <Grid key={label.key}></Grid>
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
