import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'

const UserManagement = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default UserManagement
