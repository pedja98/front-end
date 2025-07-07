import { Grid } from '@mui/material'
import ContractTitle from '../ContractTitle'
import Preamble from '../common/Preamble'
import { Contract } from '../../../../types/contract'
import moment from 'moment'
import ArticleOne from './ArticleOne'
import ArticleTwo from './ArticleTwo'
import ArticleThree from './ArticleThree'
import ArticleFour from './ArticleFour'
import Signatories from '../common/Signatories'
import TariffPlanAttachment from '../common/TariffPlanAttachment'

const ChangeContractContent = ({ contract }: { contract: Contract }) => {
  return (
    <Grid sx={{ pl: 1 }}>
      <ContractTitle referenceNumber={contract.referenceNumber} title='ANEKS UGOVORA O POSLOVNOJ SARADNJI' />
      <Preamble
        companyId={contract.companyId}
        opportunityType={contract.opportunityType}
        dateSign={moment(contract.dateSigned || new Date()).format('MM/DD/YYYY')}
      />
      <ArticleOne />
      <ArticleTwo />
      <ArticleThree contractObligation={contract.contractObligation} />
      <ArticleFour />
      <Signatories dateSign={moment(contract.dateSigned || new Date()).format('MM/DD/YYYY')} />
      <Grid style={{ pageBreakBefore: 'always' }}>
        <TariffPlanAttachment offerId={contract.offerId} />
      </Grid>
    </Grid>
  )
}

export default ChangeContractContent
