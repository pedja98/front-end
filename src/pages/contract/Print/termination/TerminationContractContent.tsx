import { Grid } from '@mui/material'
import { Contract } from '../../../../types/contract'
import ContractTitle from '../ContractTitle'
import Preamble from '../common/Preamble'
import moment from 'moment'

const TerminationContractContent = ({ contract }: { contract: Contract }) => {
  return (
    <Grid sx={{ pl: 1 }}>
      <ContractTitle referenceNumber={contract.referenceNumber} title='RASKID UGOVORA O POSLOVNOJ SARADNJI' />
      <Preamble
        companyId={contract.companyId}
        opportunityType={contract.opportunityType}
        dateSign={moment(contract.dateSigned || new Date()).format('MM/DD/YYYY')}
      />
    </Grid>
  )
}

export default TerminationContractContent
