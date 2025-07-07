import { Grid, Typography } from '@mui/material'

const ArticleFour = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 1 – Predmet Aneksa'}</Typography>
      <Typography variant='body1'>{`Ovim Aneksom vrši se izmena strukture tarifnih planova koji su predmet važećeg Ugovora o poslovnoj saradnji. Strane su saglasne da:`}</Typography>
      <Typography variant='body1'>{`Korisnik deaktivira određene tarifne planove koje više ne koristi;`}</Typography>
      <Typography variant='body1'>{`Korisnik uvodi nove tarifne planove koje želi da koristi od dana potpisivanja ovog Aneksa;`}</Typography>
      <Typography variant='body1'>{`Ažurirana lista aktivnih i deaktiviranih planova prikazana je u Prilogu 1, koji postaje sastavni deo ovog Aneksa`}</Typography>
    </Grid>
  )
}

export default ArticleFour
