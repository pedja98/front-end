import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useGetCompanyQuery } from '../../../../app/apis/crm/company.api'

const Preamble = ({ companyId }: { companyId: number }) => {
  const { data: company } = useGetCompanyQuery(companyId)
  return (
    <Grid>
      <Typography variant='body1'>{'Ugovor je zaključen izemdju:'}</Typography>
      <Typography variant='body1'>
        {'Kompanija XY, sa sedištem u Beogradu, PIB: 123456, u daljem tekstu isporučilac'}
      </Typography>
      <Typography variant='body1'>{'i'}</Typography>
      <Typography variant='body1'>{`Kompanija ${company?.name} sa sedištem u ${company?.hqAddress} PIB: ${company?.tin}, u daljem tekstu korisnik,`}</Typography>
      <Typography variant='body1'>{`zajedno: Strane, a pojedinačno: Strana`}</Typography>
    </Grid>
  )
}

export default Preamble
