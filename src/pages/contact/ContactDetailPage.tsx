import { Button, Grid } from '@mui/material'
import { EmptyValue } from '../../consts/common'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useDeleteContactMutation, useGetContactQuery } from '../../app/apis/contact.api'
import { getContactDetailListLabels, transformContactIntoPageGridData } from '../../transformers/contact'
import { hideConfirm, showConfirm } from '../../features/confirm.slice'
import { confirmEntityIsDeleted } from '../../features/common.slice'
import DetailPageGridField from '../../components/DetailPageGridField'

const ContactDetailPage = () => {
  const contactId = String(useParams().id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const entityIsDeleted = !!useAppSelector((state) => state.common.entityIsDeleted)

  const {
    isLoading: isGetContactLoading,
    data: contact,
    isError,
    error,
  } = useGetContactQuery(contactId, { skip: !!entityIsDeleted })
  const [deleteContact, { isLoading: isDeleteContactLoading }] = useDeleteContactMutation()

  if (isGetContactLoading || isDeleteContactLoading) {
    return <Spinner />
  }

  if (isError || !contact) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/contacts')
    return null
  }

  const detailPageContactGridData = transformContactIntoPageGridData(t, contact, true)

  const labels = getContactDetailListLabels(t)

  const handleEditRedirect = () => {
    navigate(`/index/contacts/${contactId}/edit`)
  }

  const handleConfirmClose = () => {
    dispatch(hideConfirm())
  }

  const handleDeleteClick = () => {
    dispatch(
      showConfirm({
        confirmationText: t('contacts:contactDeletionText', {
          firstName: contact.firstName,
          lastName: contact.lastName,
        }),
        confirmationTitle: t('general:confirmDeletionTitle'),
        onConfirm: handleConfirmDelete,
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
  }

  const handleConfirmDelete = async () => {
    try {
      dispatch(confirmEntityIsDeleted())
      await deleteContact(contactId).unwrap()
      dispatch(
        setNotification({
          text: t('contacts:contactDeleted', { fullName: contact.firstName + ' ' + contact.lastName }),
          type: NotificationType.Success,
        }),
      )
      navigate('/index/contacts')
    } catch (error) {
      dispatch(
        setNotification({
          text: JSON.stringify(error),
          type: NotificationType.Error,
        }),
      )
    } finally {
      dispatch(hideConfirm())
    }
  }

  return (
    <>
      <Grid sx={{ width: '100%', mt: 1, mb: 1 }}>
        <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Grid sx={{ width: '80%' }}>
            <Button onClick={handleEditRedirect} sx={{ ml: 0.5, width: '100px' }}>
              {t('general:edit')}
            </Button>
            <Button sx={{ ml: 0.5, width: '100px' }} onClick={handleDeleteClick}>
              {t('general:delete')}
            </Button>
          </Grid>
        </Grid>
        <Grid sx={{ display: 'flex', mt: 1, justifyContent: 'center' }}>
          <Grid container spacing={2} sx={{ width: '80%' }}>
            {labels.map((label) => {
              const gridFieldData = detailPageContactGridData[label.key] || EmptyValue
              return <DetailPageGridField key={label.key} gridFieldData={gridFieldData} label={label} />
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ContactDetailPage
