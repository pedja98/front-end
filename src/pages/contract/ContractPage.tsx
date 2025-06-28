import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'

const ContractPage = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default ContractPage
