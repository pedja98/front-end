import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { Button, Grid } from '@mui/material'
import { EmptyValue } from '../../consts/common'
import { useGetCustomerSessionQuery } from '../../app/apis/customerSession.api'
import {
  getCustomerSessionDetailPageLabels,
  transformCustomerSessionIntoPageGridData,
} from '../../transformers/customerSession'
import DetailPageGridField from '../../components/DetailPageGridField'

const CustomerSessionDetailPage = () => {
  const params = useParams()
  const customerSessionId = params.id ? params.id : undefined
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const {
    isLoading: isGetCustomerSessionLoading,
    data: customerSession,
    isError,
    error,
  } = useGetCustomerSessionQuery(customerSessionId ?? '')

  if (isGetCustomerSessionLoading) {
    return <Spinner />
  }

  if (isError || !customerSession) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/customer-sessions')
    return null
  }

  const detailPageCustomerSessionGridData = transformCustomerSessionIntoPageGridData(t, customerSession, true)

  const labels = getCustomerSessionDetailPageLabels(t)

  const handleEditRedirect = () => {
    navigate(`/index/customer-sessions/${customerSessionId}/edit`)
  }

  return (
    <>
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
              const gridFieldData = detailPageCustomerSessionGridData[label.key] || EmptyValue
              return <DetailPageGridField key={label.key} gridFieldData={gridFieldData} label={label} />
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerSessionDetailPage
