import { Grid, Typography } from '@mui/material'

const ArticleTwo = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 2 – Obaveze Isporučioca'}</Typography>
      <Typography variant='body1'>{`Isporučilac se obavezuje da:`}</Typography>
      <Typography variant='body1'>{`1. Obezbedi Korisniku SIM kartice u skladu sa brojem i tarifnim planovima iz tabele (Prilog 1).`}</Typography>
      <Typography variant='body1'>{`2. Aktivira SIM kartice u roku od 30 radnih dana od dana preuzimanja.`}</Typography>
      <Typography variant='body1'>{`3. Obezbedi tehničku podršku i korisnički servis u vezi sa isporučenim karticama.`}</Typography>
    </Grid>
  )
}

export default ArticleTwo
