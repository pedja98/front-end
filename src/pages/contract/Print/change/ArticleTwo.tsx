import { Grid, Typography } from '@mui/material'

const ArticleTwo = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 2 – Uslovi korišćenja tarifnih planova'}</Typography>
      <Typography variant='body1'>{`Novi tarifni planovi stupaju na snagu danom potpisivanja ovog Aneksa, osim ako se drugačije ne navede u Prilogu 1`}</Typography>
      <Typography variant='body1'>{`Deaktivirani tarifni planovi prestanak važenja imaju danom zaključenja ovog Aneksa, a sve prethodne obaveze po tim planovima ostaju važeće do tog dana.`}</Typography>
      <Typography variant='body1'>{`Svi ostali uslovi korišćenja tarifnih planova, uključujući način plaćanja i tehničku realizaciju, ostaju nepromenjeni i u skladu sa osnovnim ugovorom.`}</Typography>
    </Grid>
  )
}

export default ArticleTwo
