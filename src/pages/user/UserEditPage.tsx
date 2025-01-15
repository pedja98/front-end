import { useTranslation } from 'react-i18next'
import EditUser from './EditUser'
import ChangePassword from './ChangePassword'
import BasicTabs from '../../components/BasicTabs'

const UserEditPage = () => {
  const { t } = useTranslation()

  const editProfileTabData = {
    [t('user:editUserData')]: <EditUser />,
    [t('user:changePasswordLabel')]: <ChangePassword />,
  }

  return <BasicTabs tabs={editProfileTabData} />
}

export default UserEditPage
