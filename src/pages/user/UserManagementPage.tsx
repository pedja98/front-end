import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'

const UserManagementPage = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default UserManagementPage
