import { Grid, Typography } from '@mui/material'

const ArticleTwo = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 2 – Nova ugovorna obaveza'}</Typography>
      <Typography variant='body1'>{`Zaključenjem ovog Ugovora o obnovi, Korisnik je dostavio ažuriranu listu tarifnih planova koje će koristiti, uključujući i podatke o tarifnim planovima koje želi deaktivirati i/ili dodati`}</Typography>
      <Typography variant='body1'>{`Time stupa na snagu nova ugovorna obaveza Korisnika da koristi tarifne planove u skladu sa ažuriranom tabelom (Prilog 1), koja od ovog trenutka zamenjuje prethodnu.`}</Typography>
      <Typography variant='body1'>{`Sve dalje izmene tarifnih planova (dodavanje, deaktivacija ili promene) biće moguće isključivo zaključenjem novog aneksa ili pisanom saglasnošću obe ugovorne strane.`}</Typography>
    </Grid>
  )
}

export default ArticleTwo
