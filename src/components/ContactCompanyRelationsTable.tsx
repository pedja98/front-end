import { useTranslation } from 'react-i18next'
import {
  useDeleteCompanyContractRelationMutation,
  useGetAllCompanyContractRelationsQuery,
} from '../app/apis/crm/company-contact-relation.api'
import { useAppDispatch } from '../app/hooks'
import { setNotification } from '../features/notifications.slice'
import { NotificationType } from '../types/notification'
import { hideConfirm, showConfirm } from '../features/confirm.slice'
import { EntityConfirmationDialogOptions } from '../types/common'
import { confirmEntityIsDeleted } from '../features/common.slice'
import {
  getCompanyContactRelationColumnLabels,
  transformCompanyContactRelationIntoPageGridData,
} from '../transformers/contact'
import { Grid } from '@mui/material'
import ExpandableTable from './ExpandableTable'

const ContactCompanyRelationsTable = ({ contactId, companyId }: { contactId?: number; companyId?: number }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const queryParams = companyId ? `?companyId=${companyId}` : `?contactId=${contactId}`

  const {
    isLoading: isLoadingGetRelations,
    data: relations,
    isError: isErrorGetRelations,
    error: errorGetRelations,
  } = useGetAllCompanyContractRelationsQuery(queryParams)

  const [deleteRelation, { isLoading: isDeleteRelationLoading }] = useDeleteCompanyContractRelationMutation()

  if (isErrorGetRelations) {
    dispatch(
      setNotification({
        text: JSON.stringify(errorGetRelations),
        type: NotificationType.Error,
      }),
    )
  }

  const handleConfirmClose = () => {
    dispatch(hideConfirm())
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

  const relationTableColumLabels = getCompanyContactRelationColumnLabels(t, !!companyId)

  return (
    <Grid sx={{ width: '100%' }}>
      <ExpandableTable
        title={companyId ? t('pageNamesAndActions.contacts') : t('contacts:companyRelationsTitle')}
        hideActionSection={!!companyId}
        expandableDialogAction={handleCreateRelationDialogOpen}
        isLoading={isLoadingGetRelations || isDeleteRelationLoading}
        columns={relationTableColumLabels}
        rows={relationTableGridData}
        actionText={t('general:create')}
      />
    </Grid>
  )
}

export default ContactCompanyRelationsTable
