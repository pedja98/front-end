import { Grid, Typography } from '@mui/material'

const ArticleThree = ({ contractObligation }: { contractObligation: number }) => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 3 – Važenje ugovora'}</Typography>
      <Typography variant='body1'>
        {`Zaključenjem ovog Aneksa otpočinje nova ugovorna obaveza u trajanju od ${contractObligation} meseci.`}
      </Typography>
      <Typography variant='body1'>
        {`Tarifni planovi i dodaci iz osnovnog ugovora i ranijih aneksa prestaju da važe zaključenjem ovog Aneksa. Važeći su isključivo tarifni planovi definisani u ovom dokumentu (Prilog 1), koji će biti osnova za obračun.`}
      </Typography>
    </Grid>
  )
}

export default ArticleThree
