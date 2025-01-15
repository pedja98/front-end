import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

const ContactPage = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}
export default ContactPage
