import { Grid, Typography } from '@mui/material'

const ArticleThree = ({ dateSign, contractObligation }: { dateSign: string; contractObligation: number }) => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 3 – Trajanje i važenje'}</Typography>
      <Typography variant='body1'>{`Ovaj ugovor o obnovi zaključuje se na dodatni period od ${dateSign} meseci, počev od dana ${contractObligation}.`}</Typography>
      <Typography variant='body1'>{`Sve odredbe prethodnog Ugovora koje nisu izmenjene ovim Aneksom ostaju na snazi i primenjuju se kao sastavni deo ovog obnovljenog odnosa.`}</Typography>
    </Grid>
  )
}

export default ArticleThree
