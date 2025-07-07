import { Grid, Typography } from '@mui/material'

const ArticleOne = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 1 – Obnova saradnje i tarifnih planova'}</Typography>
      <Typography variant='body1'>{`Korisnik ovim putem obnavlja važenje svih prethodno aktivnih tarifnih planova pod uslovima iz Ugovora, osim onih koje izričito označi za deaktivaciju.`}</Typography>
      <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
        {
          'Korisnik ima pravo da: \n\t• dodaje nove tarifne planove, koji stupaju na snagu danom aktivacije kartica; \n\t• deaktivira postojeće tarifne planove koji se više neće koristiti, uz obavezu da prethodno izmireni računi ostaju na snazi.'
        }
      </Typography>
      <Typography variant='body1'>{`Aktivni tarifni planovi nakon obnove, kao i broj kartica po svakom planu, definisani su u ažuriranoj Tabeli tarifnih planova (Prilog 1 ovog dokumenta)`}</Typography>
    </Grid>
  )
}

export default ArticleOne
