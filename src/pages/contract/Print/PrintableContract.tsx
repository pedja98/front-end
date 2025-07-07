import { Grid } from '@mui/material'
import { forwardRef } from 'react'
import { Contract } from '../../../types/contract'
import { OpportunityType } from '../../../types/opportunity'
import AcquisitionContractContent from './acquisition/AcquisitionContractContent'
import RenewalContractContent from './renewal/RenewalContractContent'
import ChangeContractContent from './change/ChangeContractContent'
import TerminationContractContent from './termination/TerminationContractContent'

const PrintableContract = forwardRef<
  HTMLDivElement,
  {
    contract: Contract
  }
>(({ contract }, ref) => {
  const renderContractContent = () => {
    switch (contract.opportunityType) {
      case OpportunityType.ACQUISITION:
        return <AcquisitionContractContent contract={contract} />
      case OpportunityType.RENEWAL:
        return <RenewalContractContent contract={contract} />
      case OpportunityType.CHANGE:
        return <ChangeContractContent contract={contract} />
      case OpportunityType.TERMINATION:
        return <TerminationContractContent contract={contract} />
      default:
        return null
    }
  }

  return <Grid ref={ref}>{renderContractContent()}</Grid>
})

PrintableContract.displayName = 'PrintableContract'

export default PrintableContract
