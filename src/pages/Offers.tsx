import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

const Offers = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default Offers
