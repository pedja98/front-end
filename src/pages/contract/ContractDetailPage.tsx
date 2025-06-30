import { Button, Grid } from '@mui/material'
import DetailPageGridField from '../../components/DetailPageGridField'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import {
  useCloseContractMutation,
  useGetContractByIdQuery,
  useVerifyContractMutation,
} from '../../app/apis/crm/contract.api'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import {
  getContractLabels,
  getDocumentTableColumns,
  transformContractDataIntoGridData,
  transformIntoDocumentTableRows,
} from '../../transformers/contract'
import ExpandableTable from '../../components/ExpandableTable'
import { hideConfirm, showConfirm } from '../../features/confirm.slice'
import { EntityConfirmationDialogOptions } from '../../types/common'
import {
  useDeleteDocumentMutation,
  useDownloadDocumentMutation,
  useGetDocumentsByContractIdQuery,
} from '../../app/apis/crm/document.api'
import { ContractStatus } from '../../types/contract'

const ContractDetailPage = () => {
  const contractId = useParams().id as string
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [verifyContract, { isLoading: isLoadingContractVerify }] = useVerifyContractMutation()
  const [closeContract, { isLoading: isLoadingContractClose }] = useCloseContractMutation()

  const [downloadDocument, { isLoading: isLoadingDownload, error: errorDownload, isError: isErrorDownload }] =
    useDownloadDocumentMutation()

  const { isLoading: isGetContractLoading, data: contract, isError, error } = useGetContractByIdQuery(contractId)

  const {
    isLoading: isGetDocumentsLoading,
    data: documents,
    error: getDocsError,
  } = useGetDocumentsByContractIdQuery(contractId)

  const [deleteDocument, { isLoading: isLoadingDeleteDocument }] = useDeleteDocumentMutation()

  if (
    isLoadingContractClose ||
    isGetContractLoading ||
    isGetDocumentsLoading ||
    isLoadingDeleteDocument ||
    isLoadingDownload ||
    isLoadingContractVerify
  ) {
    return <Spinner />
  }

  if (isError || !contract || !documents || isErrorDownload) {
    dispatch(
      setNotification({
        text: JSON.stringify(error || getDocsError || errorDownload),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/contracts')
    return null
  }

  const handleUploadDocument = () => {
    dispatch(
      showConfirm({
        confirmationTitle: t('contracts:uploadDocument'),
        customConfirmComponentCode: EntityConfirmationDialogOptions.UploadContractDocument,
        customConfirmComponentAttributes: { contractId },
      }),
    )
  }

  const handleRemoveDocument = async (id: number) => {
    try {
      await deleteDocument(id).unwrap()
      dispatch(
        setNotification({
          text: t('contracts:documentRemoved'),
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
    }
  }

  const handleDownloadDocument = async (id: number) => {
    try {
      const base64Doc = await downloadDocument(id).unwrap()
      const base64 = base64Doc.response

      const byteCharacters = atob(base64)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)

      const blob = new Blob([byteArray], { type: 'application/pdf' })

      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `document_${id}.pdf`
      link.click()

      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      dispatch(
        setNotification({
          text: JSON.stringify(error),
          type: NotificationType.Error,
        }),
      )
    }
  }

  const detailPageContractGridData = transformContractDataIntoGridData(t, contract, true)
  const labels = getContractLabels(t)

  const handleSigned = () => {
    dispatch(
      showConfirm({
        confirmationTitle: t('contracts:signContract'),
        customConfirmComponentCode: EntityConfirmationDialogOptions.SignContractDialog,
        customConfirmComponentAttributes: { contractId },
      }),
    )
  }

  const handleVerify = async () => {
    try {
      const response = await verifyContract({
        contractId: Number(contractId),
      }).unwrap()
      const messageCode = `contracts:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
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

  const handleCloseContract = async () => {
    try {
      const response = await closeContract({
        contractId: Number(contractId),
      }).unwrap()
      const messageCode = `contracts:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
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

  const handleClose = () => {
    dispatch(
      showConfirm({
        confirmationText: t('contracts:closeContractConfirmation'),
        confirmationTitle: t('contracts:closeContract'),
        onConfirm: handleCloseContract,
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
  }

  const handleVerified = () => {
    dispatch(
      showConfirm({
        confirmationText: t('contracts:verifyContractConfirmation'),
        confirmationTitle: t('contracts:verifyContract'),
        onConfirm: handleVerify,
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
  }

  const handleConfirmClose = () => {
    dispatch(hideConfirm())
  }

  const documentTableColumns = getDocumentTableColumns(t)
  const documentTableRows = documents.map((doc) =>
    transformIntoDocumentTableRows(doc, handleRemoveDocument, handleDownloadDocument),
  )

  return (
    <Grid sx={{ width: '100%', mt: 1, mb: 1 }}>
      <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid sx={{ width: '80%' }}>
          {contract.status === ContractStatus.CREATED && (
            <Button onClick={handleSigned} sx={{ ml: 0.5, width: '100px' }}>
              {t('contracts:signed')}
            </Button>
          )}
          {contract.status === ContractStatus.CONTRACT_SIGNED && (
            <Button onClick={handleVerified} sx={{ ml: 0.5, width: '100px' }}>
              {t('contracts:verify')}
            </Button>
          )}
          {contract.status !== ContractStatus.CONTRACT_SIGNED_AND_VERIFIED && (
            <Button onClick={handleClose} sx={{ ml: 0.5, width: '100px' }}>
              {t('contracts:close')}
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid sx={{ display: 'flex', mt: 1, justifyContent: 'center' }}>
        <Grid container spacing={2} sx={{ width: '80%' }}>
          {labels.map((label) => {
            const gridFieldData = detailPageContractGridData[label.key]
            return <DetailPageGridField key={label.key} gridFieldData={gridFieldData} label={label} />
          })}
        </Grid>
      </Grid>
      <Grid sx={{ width: '100%', mt: 3 }}>
        <ExpandableTable
          title={t('contract:documents')}
          hideActionSection={false}
          expandableDialogAction={handleUploadDocument}
          isLoading={false}
          columns={documentTableColumns}
          rows={documentTableRows}
          actionText={t('upload')}
        />
      </Grid>
    </Grid>
  )
}

export default ContractDetailPage
