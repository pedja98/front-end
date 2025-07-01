import { Grid, Typography } from '@mui/material'

const ArticleFour = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 4 – Cena i način plaćanja'}</Typography>
      <Typography variant='body1'>{`1. Cena po tarifnim planovima definisana je u Prilogu 1 ovog ugovora.`}</Typography>
      <Typography variant='body1'>{`2. Ukupna mesečna naknada se obračunava na osnovu broja aktivnih kartica po tarifama.`}</Typography>
      <Typography variant='body1'>{`3. Korisnik se obavezuje da izvrši uplatu do 15 dana u mesecu za predhodni mesec, na račun isporučioca`}</Typography>
      <Typography variant='body1'>{`broj: 4545454545`}</Typography>
    </Grid>
  )
}

export default ArticleFour
