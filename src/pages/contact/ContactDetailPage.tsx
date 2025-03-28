import { Button, Grid } from '@mui/material'
import { EmptyValue } from '../../consts/common'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useDeleteContactMutation, useGetContactQuery } from '../../app/apis/contact.api'
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
import { ApiException, ModulesOptions } from '../../types/common'
import {
  useCreateCompanyContractRelationMutation,
  useGetCompanyContractRelationByContactIdQuery,
} from '../../app/apis/company-contact-relation.api'
import {
  CompanyContactRelationFormProps,
  CompanyContactRelationType,
  CreateCompanyContactRelation,
} from '../../types/contact'

const ContactDetailPage = () => {
  const contactId = String(useParams().id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const entityIsDeleted = !!useAppSelector((state) => state.common.entityIsDeleted)
  const relationData = useAppSelector((state) => state.entity) as CompanyContactRelationFormProps

  const [createCompanyContractRelation, { isLoading: isLoadingCreateCompanyContractRelation }] =
    useCreateCompanyContractRelationMutation()

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
  } = useGetCompanyContractRelationByContactIdQuery(contactId, { skip: !!entityIsDeleted })

  const [deleteContact, { isLoading: isDeleteContactLoading }] = useDeleteContactMutation()

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

  const handleRelationCreate = async () => {
    const createRelationData: CreateCompanyContactRelation = {
      contactId: Number(contactId),
      relationTypes: relationData.relationTypes as CompanyContactRelationType[],
      companyId: Number(relationData.companyId),
    }

    try {
      const response = await createCompanyContractRelation(createRelationData).unwrap()
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
    }
  }

  const relationTableGridData = Array.isArray(relations)
    ? relations.map((relation) => transformCompanyContactRelationIntoPageGridData(t, relation))
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
            moduleOption={ModulesOptions.Contacts}
            expandableDialogAction={handleRelationCreate}
            isLoading={isLoadingGetRelations || isLoadingCreateCompanyContractRelation}
            columns={relationTableColumLabels}
            rows={relationTableGridData}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ContactDetailPage
