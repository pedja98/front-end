import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

const CustomerSessionPage = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default CustomerSessionPage
