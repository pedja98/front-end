import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'

const UserManagment = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default UserManagment
