import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from '../../app/apis/crm.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { createQueryParamsForSearch } from '../../helpers/common'
import { NotificationTypeEnum } from '../../types/notification'
import Spinner from '../common/Spinner'
import UniformTable from '../common/UniformTable'
import { transformUserDataForUniformTable } from '../../transformers/user'
import { Pagination, Grid } from '@mui/material'
import { t } from 'i18next'

const ListUsers = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: users, isError, error } = useGetUsersQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 20

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !users) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationTypeEnum.Error,
      }),
    )
    navigate('/index/user-managment')
    return null
  }

  const paginatedUsers = users.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  const transformedUsers = transformUserDataForUniformTable(paginatedUsers)

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
    <Grid sx={{ pt: 5 }}>
      <UniformTable columns={columns} rows={transformedUsers} />
      <Pagination
        count={Math.ceil(users.length / rowsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color='primary'
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
    </Grid>
  )
}

export default ListUsers
