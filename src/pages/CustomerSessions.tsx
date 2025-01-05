import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

const CustomerSessions = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default CustomerSessions
