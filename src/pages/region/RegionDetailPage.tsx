import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useDeleteRegionMutation, useGetRegionQuery } from '../../app/apis/region.api'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { transformRegionIntoPageGridData } from '../../transformers/region'
import { hideConfirm, showConfirm } from '../../features/confirm.slice'
import { confirmEntityIsDeleted } from '../../features/common.slice'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { EmptyValue, GridFieldTypes } from '../../consts/common'
import { LinkStyled } from '../../styles/common'

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

  const handleEditRedirect = () => {
    navigate(`/index/regions/${regionId}/edit`)
  }

  const labels = [
    { label: t('regions:name'), key: 'name' },
    { label: t('general:createdBy'), key: 'createdByUsername' },
    { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
    { label: t('general:dateCreated'), key: 'dateCreated' },
    { label: t('general:dateModified'), key: 'dateModified' },
  ]

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
              const gridFieldData = detailPageRegionGridData[label.key] || EmptyValue

              return (
                <Grid item xs={12} sm={6} key={label.key}>
                  <Grid container alignItems='center' sx={{ height: '50px' }}>
                    <Grid item sx={{ minWidth: 120 }}>
                      <Typography variant='subtitle1'>{label.label}</Typography>
                    </Grid>
                    <Grid item xs>
                      <Grid item xs>
                        {(() => {
                          if (gridFieldData.type === GridFieldTypes.STRING) {
                            return (
                              <TextField
                                fullWidth
                                value={gridFieldData.value}
                                variant='outlined'
                                disabled
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            )
                          } else if (gridFieldData.type === GridFieldTypes.LINK && gridFieldData.value) {
                            return <LinkStyled to={String(gridFieldData.link)}>{gridFieldData.value}</LinkStyled>
                          } else {
                            return (
                              <TextField
                                fullWidth
                                value={EmptyValue}
                                variant='outlined'
                                disabled
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            )
                          }
                        })()}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default RegionDetailPage
