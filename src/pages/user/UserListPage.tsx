import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { createQueryParamsForSearch } from '../../helpers/common'
import { NotificationType } from '../../types/notification'
import Spinner from '../../components/Spinner'
import UniformTable from '../../components/UniformTable'
import { getUseDetailListPagesLabels, transformUserIntoPageGridData } from '../../transformers/user'
import { Pagination, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useGetUsersQuery } from '../../app/apis/user.api'
import { TabelRowPerPage } from '../../consts/common'

const UserListPage = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: users, isError, error } = useGetUsersQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !users) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/users')
    return null
  }

  const paginatedUsers = users.slice((currentPage - 1) * TabelRowPerPage, currentPage * TabelRowPerPage)
  const listPageUserGridData = paginatedUsers.map((user) => transformUserIntoPageGridData(user))

  const columns = getUseDetailListPagesLabels(t)

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.users`).toLocaleUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <UniformTable columns={columns} rows={listPageUserGridData} />
        <Pagination
          count={Math.ceil(users.length / TabelRowPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color='primary'
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Grid>
    </Grid>
  )
}

export default UserListPage
