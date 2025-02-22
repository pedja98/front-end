import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'

const UserPage = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default UserPage
