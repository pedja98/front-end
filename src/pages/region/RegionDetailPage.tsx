import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useDeleteRegionMutation, useGetRegionQuery } from '../../app/apis/crm/region.api'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { getRegionPageGridLabels, transformRegionIntoPageGridData } from '../../transformers/region'
import { hideConfirm, showConfirm } from '../../features/confirm.slice'
import { confirmEntityIsDeleted } from '../../features/common.slice'
import { Button, Grid } from '@mui/material'
import DetailPageGridField from '../../components/DetailPageGridField'

const RegionDetailPage = () => {
  const regionId = String(useParams().id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const entityIsDeleted = !!useAppSelector((state) => state.common.entityIsDeleted)
  const {
    isLoading: isGetRegionLoading,
    data: region,
    isError,
    error,
  } = useGetRegionQuery(regionId, { skip: !!entityIsDeleted })

  const [deleteRegion, { isLoading: isDeleteRegionLoading }] = useDeleteRegionMutation()

  if (isGetRegionLoading || isDeleteRegionLoading) {
    return <Spinner />
  }

  if (isError || !region) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/regions')
    return null
  }

  const handleDeleteClick = () => {
    dispatch(
      showConfirm({
        confirmationText: t('regions:regionDeletionText', { name: region.name }),
        confirmationTitle: t('general:confirmDeletionTitle'),
        onConfirm: handleConfirmDelete,
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
  }

  const handleConfirmClose = () => {
    dispatch(hideConfirm())
  }

  const handleConfirmDelete = async () => {
    try {
      dispatch(confirmEntityIsDeleted())
      await deleteRegion(regionId).unwrap()
      dispatch(
        setNotification({
          text: t('regions:regionDeleted', { name: region.name }),
          type: NotificationType.Success,
        }),
      )
      navigate('/index/regions')
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

  const detailPageRegionGridData = transformRegionIntoPageGridData(region, true)
  const labels = getRegionPageGridLabels(t)

  const handleEditRedirect = () => {
    navigate(`/index/regions/${regionId}/edit`)
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
              const gridFieldData = detailPageRegionGridData[label.key]
              return <DetailPageGridField key={label.key} gridFieldData={gridFieldData} label={label} />
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default RegionDetailPage
