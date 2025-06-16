import { Button, Grid } from '@mui/material'
import { EmptyValue } from '../../consts/common'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useDeleteContactMutation, useGetContactQuery } from '../../app/apis/crm/contact.api'
import {
  getCompanyContactRelationColumnLabels,
  getContactDetailListLabels,
  transformCompanyContactRelationIntoPageGridData,
  transformContactIntoPageGridData,
} from '../../transformers/contact'
import { hideConfirm, showConfirm } from '../../features/confirm.slice'
import { confirmEntityIsDeleted } from '../../features/common.slice'
import DetailPageGridField from '../../components/DetailPageGridField'
import ExpandableTable from '../../components/ExpandableTable'
import {
  useDeleteCompanyContractRelationMutation,
  useGetCompanyContractRelationsByContactIdQuery,
} from '../../app/apis/crm/company-contact-relation.api'
import { EntityConfirmationDialogOptions } from '../../types/common'

const ContactDetailPage = () => {
  const contactId = Number(useParams().id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const entityIsDeleted = !!useAppSelector((state) => state.common.entityIsDeleted)

  const {
    isLoading: isGetContactLoading,
    data: contact,
    isError: isErrorGetContact,
    error: errorGetContact,
  } = useGetContactQuery(contactId, { skip: !!entityIsDeleted })

  const {
    isLoading: isLoadingGetRelations,
    data: relations,
    isError: isErrorGetRelations,
    error: errorGetRelations,
  } = useGetCompanyContractRelationsByContactIdQuery(contactId)

  const [deleteContact, { isLoading: isDeleteContactLoading }] = useDeleteContactMutation()

  const [deleteRelation, { isLoading: isDeleteRelationtLoading }] = useDeleteCompanyContractRelationMutation()

  if (isGetContactLoading || isDeleteContactLoading) {
    return <Spinner />
  }

  if (isErrorGetContact || isErrorGetRelations || !contact) {
    dispatch(
      setNotification({
        text: JSON.stringify(errorGetContact || errorGetRelations),
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

  const handleCreateRelationDialogOpen = () => {
    dispatch(
      showConfirm({
        confirmationTitle: (t('create') + ' ' + t('contacts:companyRelationsTitle')).toUpperCase(),
        customConfirmComponentCode: EntityConfirmationDialogOptions.CompanyContactRelationCreateDialog,
        customConfirmComponentAttributes: { contactId },
      }),
    )
  }

  const handleUpdateRelationDialogOpen = (id: number) => {
    const relation = relations?.find((relation) => relation.id === id)
    dispatch(
      showConfirm({
        confirmationTitle: (t('edit') + ' ' + t('contacts:companyRelationsTitle')).toUpperCase(),
        customConfirmComponentCode: EntityConfirmationDialogOptions.CompanyContactRelationUpdateDialog,
        customConfirmComponentAttributes: {
          relationId: relation?.id,
          relationType: relation?.relationType,
          companyId: relation?.companyId,
        },
      }),
    )
  }

  const handleConfirmRelationDelete = async (id: number) => {
    try {
      dispatch(confirmEntityIsDeleted())
      await deleteRelation(id).unwrap()
      dispatch(
        setNotification({
          text: t('contacts:relationDeleted'),
          type: NotificationType.Success,
        }),
      )
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

  const handleRelationDelete = (id: number) => {
    dispatch(
      showConfirm({
        confirmationText: t('contacts:companyContactRelationDeletionText'),
        confirmationTitle: t('general:confirmDeletionTitle'),
        onConfirm: () => handleConfirmRelationDelete(id),
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
  }

  const relationTableGridData = Array.isArray(relations)
    ? relations.map((relation) =>
        transformCompanyContactRelationIntoPageGridData(
          t,
          relation,
          handleRelationDelete,
          handleUpdateRelationDialogOpen,
        ),
      )
    : []
  const relationTableColumLabels = getCompanyContactRelationColumnLabels(t)

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
        <Grid sx={{ display: 'flex', mt: 1, justifyContent: 'center', mb: 5 }}>
          <Grid container spacing={2} sx={{ width: '80%' }}>
            {labels.map((label) => {
              const gridFieldData = detailPageContactGridData[label.key] || EmptyValue
              return <DetailPageGridField key={label.key} gridFieldData={gridFieldData} label={label} />
            })}
          </Grid>
        </Grid>
        <Grid sx={{ width: '100%' }}>
          <ExpandableTable
            title={t('contacts:companyRelationsTitle')}
            hideActionSection={false}
            expandableDialogAction={handleCreateRelationDialogOpen}
            isLoading={isLoadingGetRelations || isDeleteRelationtLoading}
            columns={relationTableColumLabels}
            rows={relationTableGridData}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ContactDetailPage
