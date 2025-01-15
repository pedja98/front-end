import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

const ShopPage = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default ShopPage
