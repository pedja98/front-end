import { Grid, Typography } from '@mui/material'
import moment from 'moment'

const Signatories = ({ dateSign }: { dateSign: string }) => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{`U Beogradu, dana ${moment(dateSign).format('MM/DD/YYYY')} godine`}</Typography>
      <Typography variant='subtitle1'>{`Za Isporučioca: __________________________`}</Typography>
      <Typography variant='subtitle1'>{`Za Korisnika: __________________________`}</Typography>
    </Grid>
  )
}

export default Signatories
