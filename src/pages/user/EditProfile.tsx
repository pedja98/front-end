import { useTranslation } from 'react-i18next'
import BasicTabs from '../../components/BasicTabs'
import EditUser from './EditUser'
import ChangePassword from './ChangePassword'

const EditProfile = () => {
  const { t } = useTranslation()

  const editProfileTabData = {
    [t('user:editUserData')]: <EditUser />,
    [t('user:changePasswordLabel')]: <ChangePassword />,
  }

  return <BasicTabs tabs={editProfileTabData} />
}

export default EditProfile
