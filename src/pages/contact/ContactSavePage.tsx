import {
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
import { EmailPattern, GridFieldTypes, PhonePattern } from '../../consts/common'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { SaveContact } from '../../types/contact'
import { useAppDispatch } from '../../app/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCreateContactMutation, useGetContactQuery, useUpdateContactMutation } from '../../app/apis/contact.api'
import { ContactDocumentTypes, SaveContactFormInitialState } from '../../consts/contact'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { getContactSaveLabels, getSaveContactGridData } from '../../transformers/contact'
import { ApiException, GridFieldType } from '../../types/common'

const ContactSavePage = () => {
  const [contactData, setContactData] = useState<Partial<SaveContact>>(SaveContactFormInitialState)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const contactId = useParams().id

  const {
    data: getContactData,
    isLoading: isLoadingGetContact,
    isError: isErrorGetContact,
    error: errorGetContact,
  } = useGetContactQuery(contactId as string, { skip: !contactId })

  useEffect(() => {
    if (getContactData) {
      setContactData({
        ...getContactData,
      })
    }
  }, [getContactData])

  const [createContact, { isLoading: isLoadingCreateContact }] = useCreateContactMutation()

  const [updateContact, { isLoading: isLoadingUpdateContact }] = useUpdateContactMutation()

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }, [])

  if (isLoadingCreateContact || isLoadingGetContact || isLoadingUpdateContact) {
    return <Spinner />
  }

  if (isErrorGetContact) {
    dispatch(
      setNotification({
        text: JSON.stringify(errorGetContact),
        type: NotificationType.Error,
      }),
    )
    navigate(contactId ? `/index/contacts/${contactId}` : `/index/contacts`)
    return null
  }

  const contactDocumentTypesOptions = Object.keys(ContactDocumentTypes).map((type) =>
    t(`contacts:documentTypes.${type.toLowerCase()}`),
  )

  const saveContactGridData = getSaveContactGridData(
    contactData,
    [t('none'), ...contactDocumentTypesOptions],
    [undefined, ...Object.values(ContactDocumentTypes)],
  )
  const labels = getContactSaveLabels(t)

  const handleSave = async () => {
    if (
      Object.keys(contactData).some(
        (key) =>
          saveContactGridData[key as keyof SaveContact]?.required &&
          !String(contactData[key as keyof SaveContact] || '').trim(),
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

    if (!EmailPattern.test(String(contactData.email))) {
      dispatch(
        setNotification({
          text: t('general:emailFormatError'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    if (!PhonePattern.test(String(contactData.phone))) {
      dispatch(
        setNotification({
          text: t('general:phoneFormatError'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    try {
      const response = contactId
        ? await updateContact({ id: contactId as string, contact: contactData }).unwrap()
        : await createContact(contactData).unwrap()
      const messageCode = `contacts:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(contactId ? `/index/contacts/${contactId}` : `/index/contacts`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `contacts:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      {!contactId && (
        <Grid item sx={{ width: '80%', mb: 2 }}>
          <Typography variant='h4'>{t('contacts:createContactLabel')}</Typography>
        </Grid>
      )}
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = saveContactGridData[label.key]
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

export default ContactSavePage
