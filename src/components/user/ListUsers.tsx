import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from '../../app/apis/crm.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { createQueryParamsForSearch } from '../../helpers/common'
import { NotificationTypeEnum } from '../../types/notification'
import Spinner from '../common/Spinner'

const ListUsers = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: users, isError, error } = useGetUsersQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
    return <></>
  }

  return <div>KKK</div>
}

export default ListUsers
