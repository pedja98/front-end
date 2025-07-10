import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { Grid, Typography } from '@mui/material'
import CustomTable from '../../components/CustomTable'
import { createQueryParams } from '../../helpers/common'
import { useGetContactsQuery } from '../../app/apis/crm/contact.api'
import { getContactDetailListLabels, transformContactIntoPageGridData } from '../../transformers/contact'
import { TableRowPerPage } from '../../consts/common'

const ContactListPage = () => {
  const queryParams = createQueryParams(useAppSelector((state) => state.search))
  const { isLoading, data: contacts, isError, error } = useGetContactsQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

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

  const listPageContactGridData = contacts.map((contact) => transformContactIntoPageGridData(t, contact))

  const columns = getContactDetailListLabels(t)

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.contacts`).toUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <CustomTable columns={columns} rows={listPageContactGridData} rowPerPage={TableRowPerPage} />
      </Grid>
    </Grid>
  )
}

export default ContactListPage
