import { Grid, Typography } from '@mui/material'

const ArticleSix = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 6 – Raskid ugovora'}</Typography>
      <Typography variant='body1'>{`Svaka strana može raskinuti ugovor jednostranom izjavom ukoliko druga strana prekrši obaveze, uz rok od 30 dana za otklanjanje nepravilnosti.`}</Typography>
      <Typography variant='body1'>{`U slučaju raskida, sve finansijske obaveze do momenta raskida ostaju na snazi.`}</Typography>
    </Grid>
  )
}

export default ArticleSix
