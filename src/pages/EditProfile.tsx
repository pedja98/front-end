import Grid from '@mui/material/Grid'
import { useGetUserByUsernameQuery } from '../app/apis/crm.api'
import Spinner from '../components/Spinner'
import { getCurrentUser } from '../helpers/common'

const EditProfile = () => {
  const currentUser = getCurrentUser()
  const { data: currentUserData, isLoading } = useGetUserByUsernameQuery(String(currentUser.username))
  if (isLoading) {
    return <Spinner />
  }
  return <Grid>{currentUserData?.firstName}</Grid>
}

export default EditProfile
