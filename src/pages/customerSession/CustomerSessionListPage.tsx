import { useNavigate } from 'react-router-dom'
import { useGetCustomerSessionsQuery } from '../../app/apis/customer-session.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createQueryParamsForSearch } from '../../helpers/common'
import { useTranslation } from 'react-i18next'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import {
  getCustomerSessionTableColumns,
  transformCustomerSessionIntoPageGridData,
} from '../../transformers/customerSession'
import { Grid, Typography } from '@mui/material'
import CustomTable from '../../components/CustomTable'
import { TableRowPerPage } from '../../consts/common'

const CustomerSessionListPage = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: customerSessions, isError, error } = useGetCustomerSessionsQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !customerSessions) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/customer-sessions')
    return null
  }

  const listPageCustomerSessionGridData = customerSessions.map((customerSession) =>
    transformCustomerSessionIntoPageGridData(t, customerSession),
  )

  const columns = getCustomerSessionTableColumns(t)

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.customerSessions`).toUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <CustomTable columns={columns} rows={listPageCustomerSessionGridData} rowPerPage={TableRowPerPage} />
      </Grid>
    </Grid>
  )
}

export default CustomerSessionListPage
