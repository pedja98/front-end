import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useGetCompanyQuery } from '../../../../app/apis/crm/company.api'
import { OpportunityType } from '../../../../types/opportunity'

const Preamble = ({
  companyId,
  opportunityType,
  dateSign,
}: {
  companyId: number
  opportunityType: OpportunityType
  dateSign: string
}) => {
  const { data: company } = useGetCompanyQuery(companyId)
  return (
    <Grid>
      <Typography variant='body1'>{`zaključen dana ${dateSign} godine u Beogradu, između:`}</Typography>
      <Typography variant='body1'>
        {'Kompanija XY, sa sedištem u Beogradu, PIB: 123456, (u daljem tekstu Isporučilac)'}
      </Typography>
      <Typography variant='body1'>{'i'}</Typography>
      <Typography variant='body1'>{`Kompanija ${company?.name} sa sedištem u ${company?.hqAddress} PIB: ${company?.tin}, (u daljem tekstu Korisnik),`}</Typography>
      <Typography variant='body1'>{`zajedno: Strane, a pojedinačno: Strana`}</Typography>
      {[OpportunityType.RENEWAL, OpportunityType.CHANGE].includes(opportunityType) && (
        <Typography variant='body1'>{`kojima se obnavlja postojeći odnos poslovne saradnje, pod uslovima definisanim u ovom ugovoru`}</Typography>
      )}
    </Grid>
  )
}

export default Preamble
