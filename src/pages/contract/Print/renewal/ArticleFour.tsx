import { Grid, Typography } from '@mui/material'

const ArticleFour = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 4 – Završne odredbe'}</Typography>
      <Typography variant='body1'>{`Ovaj dokument stupa na snagu danom potpisivanja od strane obe ugovorne strane.`}</Typography>
      <Typography variant='body1'>{`Dokument je sačinjen u dva (2) istovetna primerka, po jedan za svaku stranu.`}</Typography>
    </Grid>
  )
}

export default ArticleFour
