import { FC, useState, useRef } from 'react'
import { useUploadDocumentMutation } from '../../app/apis/crm/document.api'
import { DocumentUploadDto } from '../../types/document'
import { useAppDispatch } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { ApiException } from '../../types/common'
import { NotificationType } from '../../types/notification'
import { hideConfirm } from '../../features/confirm.slice'
import { useTranslation } from 'react-i18next'
import { Box, Button, Card, CardContent, Typography, Chip, IconButton, Grid, LinearProgress } from '@mui/material'
import { Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material'
import Spinner from '../Spinner'
import { convertToBase64 } from '../../helpers/common'

const UploadContractDocument: FC<{
  contractId: number
}> = ({ contractId }) => {
  const [uploadDocument, { isLoading }] = useUploadDocumentMutation()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      dispatch(
        setNotification({
          text: t('contracts:selectFileToUpload'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    try {
      const base64Content = await convertToBase64(selectedFile)

      const uploadDto: DocumentUploadDto = {
        fileName: selectedFile.name,
        contentType: selectedFile.type,
        fileContent: base64Content,
        contractId: contractId.toString(),
      }

      const response = await uploadDocument(uploadDto).unwrap()
      const messageCode = `contracts:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `contracts:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    } finally {
      dispatch(hideConfirm())
    }
  }

  const handleClearFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Card sx={{ maxWidth: 500, mx: 'auto', mt: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <input
              ref={fileInputRef}
              id='file-upload'
              type='file'
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              accept='.pdf,.doc,.docx,.jpg,.jpeg,.png,.txt'
            />
            <label htmlFor='file-upload'>
              <Button variant='contained' component='span' startIcon={<CloudUploadIcon />} fullWidth sx={{ py: 2 }}>
                {t('contracts:selectDocument')}
              </Button>
            </label>
          </Grid>

          {selectedFile && (
            <Grid item xs={12}>
              <Card variant='outlined' sx={{ bgcolor: 'grey.50' }}>
                <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant='body2' noWrap sx={{ fontWeight: 500 }}>
                        {selectedFile.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                        <Chip label={selectedFile.type || t('contracts:unknownType')} size='small' variant='outlined' />
                        <Chip label={formatFileSize(selectedFile.size)} size='small' variant='outlined' />
                      </Box>
                    </Box>
                    <IconButton onClick={handleClearFile} color='error' size='small' sx={{ ml: 1 }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isLoading}
                variant='contained'
                fullWidth
                sx={{ py: 1.5 }}
              >
                {t('contracts:uploadDocument')}
              </Button>
              <Button onClick={() => dispatch(hideConfirm())} variant='contained' sx={{ py: 1.5, minWidth: 100 }}>
                {t('general:close')}
              </Button>
            </Box>
          </Grid>

          {isLoading && (
            <Grid item xs={12}>
              <LinearProgress />
              <Typography variant='body2' color='text.secondary' sx={{ mt: 1, textAlign: 'center' }}>
                {t('contracts:uploading')}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default UploadContractDocument
