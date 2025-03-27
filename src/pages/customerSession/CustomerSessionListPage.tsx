import { useNavigate } from 'react-router-dom'
import { useGetCustomerSessionsQuery } from '../../app/apis/customerSession.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createQueryParamsForSearch } from '../../helpers/common'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { TabelRowPerPage } from '../../consts/common'
import {
  getCustomerSessionTableColumns,
  transformCustomerSessionIntoPageGridData,
} from '../../transformers/customerSession'
import { Grid, Typography } from '@mui/material'
import CustomTable from '../../components/CustomTable'

const CustomerSessionListPage = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: customerSessions, isError, error } = useGetCustomerSessionsQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)

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

  const paginatedCustomerSessions = customerSessions.slice(
    (currentPage - 1) * TabelRowPerPage,
    currentPage * TabelRowPerPage,
  )
  const listPageCustomerSessionGridData = paginatedCustomerSessions.map((customerSession) =>
    transformCustomerSessionIntoPageGridData(t, customerSession),
  )

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const columns = getCustomerSessionTableColumns(t)

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.customerSessions`).toUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <CustomTable
          columns={columns}
          rows={listPageCustomerSessionGridData}
          currentPage={currentPage}
          totalCount={customerSessions.length}
          rowsPerPage={TabelRowPerPage}
          onPageChange={handlePageChange}
        />
      </Grid>
    </Grid>
  )
}

export default CustomerSessionListPage
