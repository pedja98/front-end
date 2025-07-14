import { useTranslation } from 'react-i18next'
import EditUserTab from './tabs/EditUserTab'
import ChangePasswordTab from './tabs/ChangePasswordTab'
import BasicTabs from '../../components/BasicTabs'
import ChangeShopTab from './tabs/ChangeShopTab'
import { getCurrentUser } from '../../helpers/common'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserQuery } from '../../app/apis/crm/user.api'
import Spinner from '../../components/Spinner'
import { NotificationType } from '../../types/notification'
import { setNotification } from '../../features/notifications.slice'
import { useAppDispatch } from '../../app/hooks'
import { UserType } from '../../types/user'

const UserEditPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const isEditProfile = location.pathname.includes('edit-profile')
  const params = useParams()
  const username = String(isEditProfile ? getCurrentUser().username : params.username)

  const {
    data: fetchedUser,
    isLoading: getUserIsLoading,
    isError: getUserIsError,
    error: getUserError,
  } = useGetUserQuery(username)

  if (getUserIsLoading) {
    return <Spinner />
  }

  if (getUserIsError) {
    dispatch(
      setNotification({
        text: JSON.stringify(getUserError),
        type: NotificationType.Error,
      }),
    )
    isEditProfile ? navigate('/index') : navigate(`/index/users/`)
    return null
  }

  const editProfileTabData = {
    [t('users:editUserData')]: <EditUserTab fetchedUser={fetchedUser} />,
    [t('users:changePasswordLabel')]: <ChangePasswordTab />,
    ...(!isEditProfile &&
      fetchedUser?.type === UserType.SALESMAN && {
        [t('users:changeShop')]: <ChangeShopTab shopId={String(fetchedUser?.shopId || '')} />,
      }),
  }

  return <BasicTabs tabs={editProfileTabData} />
}

export default UserEditPage
