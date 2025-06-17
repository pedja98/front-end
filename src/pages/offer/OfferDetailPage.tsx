import { Button, Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useGetOfferByIdQuery } from '../../app/apis/crm/offer.api'
import { getOfferDetailLabels, transformOfferDataIntoGridData } from '../../transformers/offer'
import DetailPageGridField from '../../components/DetailPageGridField'

const OfferDetailPage = () => {
  const offerId = useParams().id as string
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { isLoading: isGetOfferLoading, data: offer, isError, error } = useGetOfferByIdQuery(offerId)

  if (isGetOfferLoading) {
    return <Spinner />
  }

  if (isError || !offer) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/offers')
    return null
  }

  const detailPageOfferGridData = transformOfferDataIntoGridData(t, offer, true)
  const labels = getOfferDetailLabels(t)

  const handleEditRedirect = () => {
    navigate(`/index/offers/${offerId}/edit`)
  }

  return (
    <Grid sx={{ width: '100%', mt: 1, mb: 1 }}>
      <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid sx={{ width: '80%' }}>
          <Button onClick={handleEditRedirect} sx={{ ml: 0.5, width: '100px' }}>
            {t('general:edit')}
          </Button>
        </Grid>
      </Grid>
      <Grid sx={{ display: 'flex', mt: 1, justifyContent: 'center' }}>
        <Grid container spacing={2} sx={{ width: '80%' }}>
          {labels.map((label) => {
            const gridFieldData = detailPageOfferGridData[label.key]
            return <DetailPageGridField key={label.key} gridFieldData={gridFieldData} label={label} />
          })}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OfferDetailPage
