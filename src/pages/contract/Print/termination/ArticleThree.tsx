import { Grid, Typography } from '@mui/material'

const ArticleThree = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 3 – deaktivacija kartica'}</Typography>
      <Typography variant='body1'>{`Korisnik se obavezuje da vrati sve SIM kartice najkasnije do 30 dana od potpisivanje ovog dokumenta.`}</Typography>
      <Typography variant='body1'>{`Isporučilac se obavezuje da izvrši deaktivaciju svih aktivnih tarifnih planova sa danom raskida ili po prijemu obaveštenja o završetku korišćenja.`}</Typography>
    </Grid>
  )
}

export default ArticleThree
