import { Button, Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useGetCompanyQuery } from '../../app/apis/crm/company.api'
import { getCompanyDetailLabels, transformCompanyDataIntoGridData } from '../../transformers/company'
import DetailPageGridField from '../../components/DetailPageGridField'
import { useGetAllContractsQuery } from '../../app/apis/crm/contract.api'
import {
  getContractColumnsForExpandableTable,
  transformContractDataIntoGridDataForExpandableTable,
} from '../../transformers/contract'
import ExpandableTable from '../../components/ExpandableTable'
import { getOfferListColumns, transformOfferDataIntoGridData } from '../../transformers/offer'
import { useGetOffersQuery } from '../../app/apis/crm/offer.api'
import { useGetOpportunitiesQuery } from '../../app/apis/crm/opportunity.api'
import { getOpportunityDetailGridLabels, transformOpportunityDataIntoGridData } from '../../transformers/opportunity'
import { useGetCustomerSessionsQuery } from '../../app/apis/crm/customer-session.api'
import {
  getCustomerSessionTableColumns,
  transformCustomerSessionIntoPageGridData,
} from '../../transformers/customerSession'

const CompanyDetailPage = () => {
  const companyId = Number(useParams().id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { isLoading: isGetCompanyLoading, data: company, isError, error } = useGetCompanyQuery(companyId)

  const gettingRelatedEntitiesQueryParam = `?companyId=${companyId}`

  const {
    isLoading: isLoadingGetContracts,
    data: contracts,
    isError: isErrorGetContract,
    error: errorGetContract,
  } = useGetAllContractsQuery(gettingRelatedEntitiesQueryParam)

  const {
    isLoading: isLoadingGetOffers,
    data: offers,
    isError: isErrorGetOffers,
    error: errorGetOffers,
  } = useGetOffersQuery(gettingRelatedEntitiesQueryParam)

  const {
    isLoading: isLoadingGetOpportunities,
    data: opportunities,
    isError: isErrorGetOpportunities,
    error: errorGetOpportunities,
  } = useGetOpportunitiesQuery(gettingRelatedEntitiesQueryParam)

  const {
    isLoading: isLoadingGetCustomerSession,
    data: customerSessions,
    isError: isErrorGetCustomerSession,
    error: errorGetCustomerSession,
  } = useGetCustomerSessionsQuery(gettingRelatedEntitiesQueryParam)

  if (isGetCompanyLoading) {
    return <Spinner />
  }

  if (
    isError ||
    !company ||
    isErrorGetContract ||
    isErrorGetOffers ||
    isErrorGetOpportunities ||
    isErrorGetCustomerSession
  ) {
    dispatch(
      setNotification({
        text: JSON.stringify(
          error || errorGetContract || errorGetOffers || errorGetOpportunities || errorGetCustomerSession,
        ),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/companies')
    return null
  }

  const detailPageCompanyGridData = transformCompanyDataIntoGridData(t, company, true)

  const labels = getCompanyDetailLabels(t)

  const handleEditRedirect = () => {
    navigate(`/index/companies/${companyId}/edit`)
  }

  const handleRedirectToCreateCustomerSession = () => {
    navigate(`/index/customer-sessions/create`)
  }

  const contractExpandableTableColumns = getContractColumnsForExpandableTable(t)
  const contractExpandableTableColumnsRows = (contracts || []).map((contract) =>
    transformContractDataIntoGridDataForExpandableTable(t, contract),
  )

  const offerTableRows = (offers || []).map((offer) => transformOfferDataIntoGridData(t, offer))
  const offerTableColumns = getOfferListColumns(t)

  const opportunityTableRows = (opportunities || []).map((opportunity) =>
    transformOpportunityDataIntoGridData(t, opportunity),
  )
  const opportunityTableColumns = getOpportunityDetailGridLabels(t, true)

  const customerSessionTableRows = (customerSessions || []).map((customerSession) =>
    transformCustomerSessionIntoPageGridData(t, customerSession),
  )
  const customerSessionsTableColumns = getCustomerSessionTableColumns(t)

  return (
    <Grid sx={{ width: '100%', mt: 1, mb: 1 }}>
      <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid sx={{ width: '80%' }}>
          <Button onClick={handleEditRedirect} sx={{ ml: 0.5, width: '100px' }}>
            {t('general:edit')}
          </Button>
        </Grid>
      </Grid>
      <Grid sx={{ display: 'flex', mt: 1, justifyContent: 'center', mb: 2 }}>
        <Grid container spacing={2} sx={{ width: '80%' }}>
          {labels.map((label) => {
            const gridFieldData = detailPageCompanyGridData[label.key]
            return <DetailPageGridField key={label.key} gridFieldData={gridFieldData} label={label} />
          })}
        </Grid>
      </Grid>
      <Grid sx={{ width: '100%', mt: 1 }}>
        <ExpandableTable
          title={t('pageNamesAndActions.customerSessions')}
          hideActionSection={false}
          expandableDialogAction={handleRedirectToCreateCustomerSession}
          isLoading={isLoadingGetCustomerSession}
          columns={customerSessionsTableColumns}
          rows={customerSessionTableRows}
          actionText={t('general:create')}
        />
      </Grid>
      <Grid sx={{ width: '100%', mt: 1 }}>
        <ExpandableTable
          title={t('pageNamesAndActions.opportunities')}
          hideActionSection={true}
          isLoading={isLoadingGetOpportunities}
          columns={opportunityTableColumns}
          rows={opportunityTableRows}
        />
      </Grid>
      <Grid sx={{ width: '100%', mt: 1 }}>
        <ExpandableTable
          title={t('pageNamesAndActions.offers')}
          hideActionSection={true}
          isLoading={isLoadingGetOffers}
          columns={offerTableColumns}
          rows={offerTableRows}
        />
      </Grid>
      <Grid sx={{ width: '100%', mt: 1 }}>
        <ExpandableTable
          title={t('pageNamesAndActions.contracts')}
          hideActionSection={true}
          isLoading={isLoadingGetContracts}
          columns={contractExpandableTableColumns}
          rows={contractExpandableTableColumnsRows}
        />
      </Grid>
    </Grid>
  )
}

export default CompanyDetailPage
