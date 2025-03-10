import { useTranslation } from 'react-i18next'
import EditUserTab from './tabs/EditUserTab'
import ChangePasswordTab from './tabs/ChangePasswordTab'
import BasicTabs from '../../components/BasicTabs'

const UserEditPage = () => {
  const { t } = useTranslation()

  const editProfileTabData = {
    [t('users:editUserData')]: <EditUserTab />,
    [t('users:changePasswordLabel')]: <ChangePasswordTab />,
  }

  return <BasicTabs tabs={editProfileTabData} />
}

export default UserEditPage
