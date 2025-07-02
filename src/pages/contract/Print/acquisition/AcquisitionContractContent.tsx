// src/components/contracts/acquisition/AcquisitionContractContent.tsx
import React from 'react'
import { Grid } from '@mui/material'
import moment from 'moment'
import Preamble from '../common/Preamble'
import Signatories from '../common/Signatories'
import ArticleOne from './ArticleOne'
import ArticleTwo from './ArticleTwo'
import ArticleThree from './ArticleThree'
import ArticleFour from './ArticleFour'
import ArticleFive from './ArticleFive'
import ArticleSix from './ArticleSix'
import ArticleSeven from './ArticleSeven'
import ArticleEight from './ArticleEight'
import { Contract } from '../../../../types/contract'
import ContractTitle from '../ContractTitle'
import TariffPlanAttachment from '../common/TariffPlanAttachment'

const AcquisitionContractContent: React.FC<{
  contract: Contract
}> = ({ contract }) => {
  return (
    <Grid sx={{ pl: 1 }}>
      <ContractTitle referenceNumber={contract.referenceNumber} />
      <Preamble companyId={contract.companyId} />
      <ArticleOne />
      <ArticleTwo />
      <ArticleThree />
      <ArticleFour />
      <ArticleFive contractObligation={contract.contractObligation} />
      <ArticleSix />
      <ArticleSeven />
      <ArticleEight />
      <Signatories dateSign={contract.dateSigned || moment(new Date()).format('MM/DD/YYYY')} />
      <TariffPlanAttachment offerId={contract.offerId} />
    </Grid>
  )
}

export default AcquisitionContractContent
