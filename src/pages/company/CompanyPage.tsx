import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

const CompanyPage = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default CompanyPage
