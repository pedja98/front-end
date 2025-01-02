import { useTranslation } from 'react-i18next'
import BasicTabs from '../components/common/BasicTabs'
import EditUser from '../components/user/EditUser'
import ChangePassword from '../components/user/ChangePassword'

const EditProfile = () => {
  const { t } = useTranslation()

  const editProfileTabData = {
    [t('user:editUserData')]: <EditUser />,
    [t('user:changePasswordLabel')]: <ChangePassword />,
  }

  return <BasicTabs tabs={editProfileTabData} />
}

export default EditProfile
