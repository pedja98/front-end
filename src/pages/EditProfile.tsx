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
  return (
    <Grid>
      <Grid>{currentUserData?.firstName}</Grid>
      <Grid>{currentUserData?.lastName}</Grid>
      <Grid>{currentUserData?.email}</Grid>
      <Grid>{currentUserData?.phone}</Grid>
      <Grid>{currentUserData?.language}</Grid>
    </Grid>
  )
}

export default EditProfile
