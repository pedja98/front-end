import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

const Shops = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default Shops
