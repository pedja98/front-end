import { Grid, Typography } from '@mui/material'

const ArticleFour = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 4 – Završne odredbe'}</Typography>
      <Typography variant='body1'>{`Ovaj raskid predstavlja konačni sporazum strana o prestanku poslovnog odnosa po osnovu predmetnog ugovora.`}</Typography>
      <Typography variant='body1'>{`Raskid stupa na snagu danom potpisivanja, osim ako nije drugačije određeno u članu 1.`}</Typography>
      <Typography variant='body1'>{`Dokument je sačinjen u dva (2) istovetna primerka, po jedan za svaku ugovornu stranu.`}</Typography>
    </Grid>
  )
}

export default ArticleFour
