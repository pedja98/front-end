import { Grid, Typography } from '@mui/material'

const ArticleOne = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 1 – Obnova saradnje i tarifnih planova'}</Typography>
      <Typography variant='body1'>{`Korisnik ovim putem obnavlja važenje svih prethodno aktivnih tarifnih planova pod uslovima iz Ugovora, osim onih koje izričito označi za deaktivaciju`}</Typography>
    </Grid>
  )
}

export default ArticleOne
