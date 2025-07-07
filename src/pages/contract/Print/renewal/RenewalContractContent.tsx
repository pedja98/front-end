import { Grid } from '@mui/material'
import { Contract } from '../../../../types/contract'
import ContractTitle from '../ContractTitle'
import Preamble from '../common/Preamble'
import moment from 'moment'
import ArticleOne from './ArticleOne'
import ArticleTwo from './ArticleTwo'
import ArticleThree from './ArticleThree'
import Signatories from '../common/Signatories'
import TariffPlanAttachment from '../common/TariffPlanAttachment'

const RenewalContractContent = ({ contract }: { contract: Contract }) => {
  return (
    <Grid sx={{ pl: 1 }}>
      <ContractTitle referenceNumber={contract.referenceNumber} title='UGOVOR O OBNOVI POSLOVNE SARADNJE' />
      <Preamble
        companyId={contract.companyId}
        opportunityType={contract.opportunityType}
        dateSign={moment(contract.dateSigned || new Date()).format('MM/DD/YYYY')}
      />
      <ArticleOne />
      <ArticleTwo />
      <ArticleThree dateSign={contract.dateSigned} contractObligation={contract.contractObligation} />
      <Signatories dateSign={moment(contract.dateSigned || new Date()).format('MM/DD/YYYY')} />
      <Grid style={{ pageBreakBefore: 'always' }}>
        <TariffPlanAttachment offerId={contract.offerId} />
      </Grid>
    </Grid>
  )
}

export default RenewalContractContent
