import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useCloseOpportunityMutation, useGetOpportunityQuery } from '../../app/apis/crm/opportunity.api'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { getOpportunityDetailGridLabels, transformOpportunityDataIntoGridData } from '../../transformers/opportunity'
import { Button, Grid } from '@mui/material'
import DetailPageGridField from '../../components/DetailPageGridField'
import { EmptyValue } from '../../consts/common'
import { ApiException } from '../../types/common'
import { OpportunityStatus } from '../../types/opportunity'
import { useGetOffersByOpportunityIdQuery } from '../../app/apis/crm/offer.api'
import { getOfferListColumns, transformOfferDataIntoGridData } from '../../transformers/offer'
import ExpandableTable from '../../components/ExpandableTable'
import { CreateOffer } from '../../types/offer'
import moment from 'moment'
import { useCreateOfferMutation } from '../../app/apis/gw/offer.api'

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

  const {
    isLoading: isGetOffersLoading,
    data: offers,
    isError: isErrorGetOffers,
    error: errorGetOffers,
    refetch: refetchGetOffersByOpportunityId,
  } = useGetOffersByOpportunityIdQuery(opportunityId)

  const [createOffer, { isLoading: isCreateOfferLoading }] = useCreateOfferMutation()

  const [closeOpportunity, { isLoading: closeOpportunityIsLoading }] = useCloseOpportunityMutation()

  if (isGetOpportunityLoading || closeOpportunityIsLoading || isGetOffersLoading || isCreateOfferLoading) {
    return <Spinner />
  }

  if (isError || !opportunity || isErrorGetOffers) {
    dispatch(
      setNotification({
        text: JSON.stringify(error || errorGetOffers),
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

  const handleCreateOffer = async () => {
    try {
      const createOfferData = {
        name:
          'Offer ' +
          opportunity.companyName +
          ' ' +
          moment().format('DD/MM/YYYY') +
          ' - ' +
          String(Number(offers?.length) + 1),
        companyId: opportunity.companyId,
        opportunityId: opportunity.id,
        opportunityType: opportunity.type,
      } as CreateOffer

      const response = await createOffer(createOfferData).unwrap()
      const messageCode = `offers:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      refetchGetOffersByOpportunityId()
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

  const offerTableRows = (offers || []).map((offer) => transformOfferDataIntoGridData(t, offer))
  const offerTableColumns = getOfferListColumns(t)

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
        <Grid sx={{ display: 'flex', mt: 1, justifyContent: 'center', mb: 2 }}>
          <Grid container spacing={2} sx={{ width: '80%' }}>
            {labels.map((label) => {
              const gridFieldData = detailPageOpportunityGridData[label.key] || EmptyValue
              return <DetailPageGridField key={label.key} gridFieldData={gridFieldData} label={label} />
            })}
          </Grid>
        </Grid>
        <Grid sx={{ width: '100%' }}>
          <ExpandableTable
            title={t('opportunities:offersTableTitle')}
            hideActionSection={false}
            expandableDialogAction={handleCreateOffer}
            isLoading={isGetOffersLoading}
            columns={offerTableColumns}
            rows={offerTableRows}
            actionText={t('general:create')}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default OpportunityDetailPage
