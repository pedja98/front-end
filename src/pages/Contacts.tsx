import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

const Contacts = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}
export default Contacts
