import { Grid, Typography } from '@mui/material'

const ArticleTwo = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 2 – Obračun i izmirenje obaveza'}</Typography>
      <Typography variant='body1'>{`Strane su saglasne da će izvršiti obračun svih međusobnih obaveza nastalih do dana raskida.`}</Typography>
      <Typography variant='body1'>{`Korisnik se obavezuje da izvrši uplatu svih otvorenih potraživanja do dana raskida najkasnije do 30 dana od potpisivanja ovog dokumenta`}</Typography>
      <Typography variant='body1'>{`Nakon ispunjenja svih finansijskih obaveza, nijedna strana neće imati daljih potraživanja po osnovu Ugovora.`}</Typography>
    </Grid>
  )
}

export default ArticleTwo
