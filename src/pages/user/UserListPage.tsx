import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { createQueryParamsForSearch } from '../../helpers/common'
import { NotificationType } from '../../types/notification'
import Spinner from '../../components/Spinner'
import CustomTable from '../../components/CustomTable'
import { getUseDetailListPagesLabels, transformUserIntoPageGridData } from '../../transformers/user'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useGetUsersQuery } from '../../app/apis/user.api'
import { TabelRowPerPage } from '../../consts/common'

const UserListPage = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: users, isError, error } = useGetUsersQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

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

  const listPageUserGridData = users.map((user) => transformUserIntoPageGridData(t, user))

  const columns = getUseDetailListPagesLabels(t)

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.users`).toUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <CustomTable columns={columns} rows={listPageUserGridData} rowPerPage={TabelRowPerPage} />
      </Grid>
    </Grid>
  )
}

export default UserListPage
