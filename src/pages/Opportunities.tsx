import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

const Opportunities = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default Opportunities
