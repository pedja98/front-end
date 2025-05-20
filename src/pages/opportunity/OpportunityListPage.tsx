import { Grid, Typography } from '@mui/material'
import CustomTable from '../../components/CustomTable'
import { TableRowPerPage } from '../../consts/common'
import { getOpportunityDetailGridLabels, transformOpportunityDataIntoGridData } from '../../transformers/opportunity'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useGetOpportunitiesQuery } from '../../app/apis/opportunity.api'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { createQueryParamsForSearch } from '../../helpers/common'

const OpportunityListPage = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: opportunities, isError, error } = useGetOpportunitiesQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !opportunities) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/opportunities')
    return null
  }

  const listPageOpportunityGridData = opportunities.map((opportunity) =>
    transformOpportunityDataIntoGridData(t, opportunity),
  )

  const columns = getOpportunityDetailGridLabels(t)

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.opportunities`).toUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <CustomTable columns={columns} rows={listPageOpportunityGridData} rowPerPage={TableRowPerPage} />
      </Grid>
    </Grid>
  )
}

export default OpportunityListPage
