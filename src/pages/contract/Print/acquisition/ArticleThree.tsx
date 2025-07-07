import { Grid, Typography } from '@mui/material'

const ArticleThree = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 3 – Obaveze Korisnika'}</Typography>
      <Typography variant='body1'>{`Korisnik se obavezuje da:`}</Typography>
      <Typography variant='body1'>{`Preuzme SIM kartice u skladu sa dogovorom i vodi evidenciju o njihovoj upotrebi.`}</Typography>
      <Typography variant='body1'>{`Uplati iznose definisane za svaki tarifni plan u skladu sa dinamikom plaćanja definisanom u članu 4.`}</Typography>
      <Typography variant='body1'>{`Ne koristi SIM kartice za aktivnosti koje su zabranjene zakonom ili protivne ugovoru.`}</Typography>
    </Grid>
  )
}

export default ArticleThree
