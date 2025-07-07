import { Grid } from '@mui/material'
import ContractTitle from '../ContractTitle'
import Preamble from '../common/Preamble'
import { Contract } from '../../../../types/contract'
import moment from 'moment'

const ChangeContractContent = ({ contract }: { contract: Contract }) => {
  return (
    <Grid sx={{ pl: 1 }}>
      <ContractTitle referenceNumber={contract.referenceNumber} title='ANEKS UGOVORA O POSLOVNOJ SARADNJI' />
      <Preamble
        companyId={contract.companyId}
        opportunityType={contract.opportunityType}
        dateSign={moment(contract.dateSigned || new Date()).format('MM/DD/YYYY')}
      />
    </Grid>
  )
}

export default ChangeContractContent
