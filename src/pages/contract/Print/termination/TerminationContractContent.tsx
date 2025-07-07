import { Grid } from '@mui/material'
import { Contract } from '../../../../types/contract'
import ContractTitle from '../ContractTitle'
import Preamble from '../common/Preamble'
import moment from 'moment'
import ArticleOne from './ArticleOne'
import ArticleTwo from './ArticleTwo'
import ArticleThree from './ArticleThree'
import ArticleFour from './ArticleFour'
import Signatories from '../common/Signatories'

const TerminationContractContent = ({ contract }: { contract: Contract }) => {
  return (
    <Grid sx={{ pl: 1 }}>
      <ContractTitle referenceNumber={contract.referenceNumber} title='RASKID UGOVORA O POSLOVNOJ SARADNJI' />
      <Preamble
        companyId={contract.companyId}
        opportunityType={contract.opportunityType}
        dateSign={moment(contract.dateSigned || new Date()).format('MM/DD/YYYY')}
      />
      <ArticleOne dateSign={moment(contract.dateSigned || new Date()).format('MM/DD/YYYY')} />
      <ArticleTwo />
      <ArticleThree />
      <ArticleFour />
      <Signatories dateSign={moment(contract.dateSigned || new Date()).format('MM/DD/YYYY')} />
    </Grid>
  )
}

export default TerminationContractContent
