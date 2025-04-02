import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useCloseOpportunityMutation, useGetOpportunityQuery } from '../../app/apis/opportunity.api'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { getOpportunityDetailGridLabels, transformOpportunityDataIntoGridData } from '../../transformers/opportunity'
import { Button, Grid } from '@mui/material'
import DetailPageGridField from '../../components/DetailPageGridField'
import { EmptyValue } from '../../consts/common'
import { ApiException } from '../../types/common'
import { OpportunityStatus } from '../../types/opportunity'

const OpportunityDetailPage = () => {
  const opportunityId = String(useParams().id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const {
    isLoading: isGetOpportunityLoading,
    data: opportunity,
    isError,
    error,
  } = useGetOpportunityQuery(opportunityId)

  const [closeOpportunity, { isLoading: closeOpportunityIsLoading }] = useCloseOpportunityMutation()

  if (isGetOpportunityLoading || closeOpportunityIsLoading) {
    return <Spinner />
  }

  if (isError || !opportunity) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/opportunities')
    return null
  }

  const detailPageOpportunityGridData = transformOpportunityDataIntoGridData(t, opportunity, true)

  const labels = getOpportunityDetailGridLabels(t)

  const handleCloseOpportunity = async () => {
    try {
      const response = await closeOpportunity(opportunityId)
      const messageCode = `opportunities:${response.data?.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `opportunities:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  const shouldCloseActionBeVisible = ![OpportunityStatus.CLOSE_LOST, OpportunityStatus.CLOSE_WON].includes(
    opportunity.status as OpportunityStatus,
  )

  return (
    <>
      <Grid sx={{ width: '100%', mt: 1, mb: 1 }}>
        <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          {shouldCloseActionBeVisible && (
            <Grid sx={{ width: '80%' }}>
              <Button onClick={handleCloseOpportunity} sx={{ ml: 0.5, width: '100px' }}>
                {t('general:close')}
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid sx={{ display: 'flex', mt: 1, justifyContent: 'center' }}>
          <Grid container spacing={2} sx={{ width: '80%' }}>
            {labels.map((label) => {
              const gridFieldData = detailPageOpportunityGridData[label.key] || EmptyValue
              return <DetailPageGridField key={label.key} gridFieldData={gridFieldData} label={label} />
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default OpportunityDetailPage
