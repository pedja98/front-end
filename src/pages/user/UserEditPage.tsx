import { useTranslation } from 'react-i18next'
import EditUserTab from './tabs/EditUserTab'
import ChangePasswordTab from './tabs/ChangePasswordTab'
import BasicTabs from '../../components/BasicTabs'
import ChangeShopTab from './tabs/ChangeShopTab'

const UserEditPage = () => {
  const { t } = useTranslation()
  const isEditProfile = location.pathname.includes('edit-profile')

  const editProfileTabData = {
    [t('users:editUserData')]: <EditUserTab />,
    [t('users:changePasswordLabel')]: <ChangePasswordTab />,
    ...(isEditProfile
      ? {}
      : {
          [t('users:changeShop')]: <ChangeShopTab />,
        }),
  }

  return <BasicTabs tabs={editProfileTabData} />
}

export default UserEditPage
