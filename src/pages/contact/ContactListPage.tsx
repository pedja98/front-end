import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { TabelRowPerPage } from '../../consts/common'
import { Grid, Pagination, Typography } from '@mui/material'
import UniformTable from '../../components/UniformTable'
import { createQueryParamsForSearch } from '../../helpers/common'
import { useGetContactsQuery } from '../../app/apis/contact.api'
import { getContactDetailListLabels, transformContactIntoPageGridData } from '../../transformers/contact'

const ContactListPage = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: contacts, isError, error } = useGetContactsQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !contacts) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/contacts')
    return null
  }

  const paginatedContacts = contacts.slice((currentPage - 1) * TabelRowPerPage, currentPage * TabelRowPerPage)
  const listPageContactGridData = paginatedContacts.map((contact) => transformContactIntoPageGridData(t, contact))

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const columns = getContactDetailListLabels(t)

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.contacts`).toLocaleUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <UniformTable columns={columns} rows={listPageContactGridData} />
        <Pagination
          count={Math.ceil(contacts.length / TabelRowPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color='primary'
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Grid>
    </Grid>
  )
}

export default ContactListPage
