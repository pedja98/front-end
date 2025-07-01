import { Grid } from '@mui/material'
import AcquisitionContractContent from './acquisition/AcquisitionContractContent'
import { Contract } from '../../../types/contract'
import { forwardRef } from 'react'

const PrintableContract = forwardRef<
  HTMLDivElement,
  {
    contract: Contract
  }
>(({ contract }, ref) => {
  return (
    <Grid ref={ref}>
      <AcquisitionContractContent contract={contract} />
    </Grid>
  )
})

PrintableContract.displayName = 'PrintableContract'

export default PrintableContract
