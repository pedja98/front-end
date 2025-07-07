import { Grid, Typography } from '@mui/material'

const ArticleOne = ({ dateSign }: { dateSign: string }) => {
  return (
    <Grid sx={{ mt: 2 }}>
      <Typography variant='subtitle1'>{'Član 1 – Predmet raskida'}</Typography>
      <Typography variant='body1'>{`Strane saglasno konstatuju da se Ugovor o poslovnoj saradnji, zaključen dana ___________ godine, raskida sporazumno, sa danom ${dateSign}.`}</Typography>
      <Typography variant='body1'>{`Raskid se odnosi na sve obaveze i prava proizašla iz osnovnog ugovora, kao i svih njegovih aneksa, osim ako nije drugačije navedeno u ovom dokumentu.`}</Typography>
    </Grid>
  )
}

export default ArticleOne
