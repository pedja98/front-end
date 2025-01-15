import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { createQueryParamsForSearch } from '../../helpers/common'
import { NotificationType } from '../../types/notification'
import Spinner from '../common/Spinner'
import UniformTable from '../common/UniformTable'
import { transformUserIntoViewGridData } from '../../transformers/user'
import { Pagination, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useGetUsersQuery } from '../../app/apis/user.api'
import { TabelRowPerPage } from '../../consts/common'

const UsersListView = () => {
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
    navigate('/index/user-management')
    return null
  }

  const paginatedUsers = users.slice((currentPage - 1) * TabelRowPerPage, currentPage * TabelRowPerPage)
  const listViewUserGridData = paginatedUsers.map((user) => transformUserIntoViewGridData(user))

  const columns = [
    { label: t('user:username'), key: 'username' },
    { label: t('user:firstName'), key: 'firstName' },
    { label: t('user:lastName'), key: 'lastName' },
    { label: t('user:email'), key: 'email' },
    { label: t('user:phone'), key: 'phone' },
    { label: t('user:type'), key: 'type' },
    { label: t('shop:shopLabel'), key: 'shopName' },
    { label: t('general:createdBy'), key: 'createdByUsername' },
    { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
    { label: t('general:dateCreated'), key: 'dateCreated' },
    { label: t('general:dateModified'), key: 'dateModified' },
  ]

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.userManagement`).toLocaleUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <UniformTable columns={columns} rows={listViewUserGridData} />
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

export default UsersListView
