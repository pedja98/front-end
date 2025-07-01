import { Grid, Typography } from '@mui/material'

const ArticleEight = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 8 – Završne odredbe'}</Typography>
      <Typography variant='body1'>{`Sve izmene ovog ugovora moraju biti sačinjene u pisanoj formi i potpisane od strane obe ugovorne strane.`}</Typography>
      <Typography variant='body1'>{`Ugovor je sačinjen u 2 (dva) istovetna primerka, od kojih svaka strana zadržava po jedan.`}</Typography>
    </Grid>
  )
}

export default ArticleEight
