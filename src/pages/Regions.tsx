import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

const Regions = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}
export default Regions
