import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

const Companies = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default Companies
