import { Grid, Typography } from '@mui/material'

const ArticleFive = ({ contractObligation }: { contractObligation: number }) => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 5 – Rok važenja ugovora'}</Typography>
      <Typography variant='body1'>{`Ovaj ugovor stupa na snagu danom potpisivanja i zaključuje se na određeno vreme od ${contractObligation} meseci/a, sa mogućnošću produženja uz pismenu saglasnost obe strane.`}</Typography>
    </Grid>
  )
}

export default ArticleFive
