import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

const Layout = () => {
  return (
    <Grid>
      <Navbar />
      <Outlet />
    </Grid>
  )
}

export default Layout
