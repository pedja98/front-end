import { Grid, Typography } from '@mui/material'

const ArticleOne = () => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 1 – Predmet ugovora'}</Typography>
      <Typography variant='body1'>{`Predmet ovog ugovora je isporuka SIM kartica od strane Isporučioca Korisniku, kao i korišćenje dogovorenih tarifnih planova navedenih u prilogu ovog ugovora (Tabela tarifnih planova).`}</Typography>
    </Grid>
  )
}

export default ArticleOne
