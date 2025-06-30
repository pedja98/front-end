import React, { forwardRef } from 'react'
import { Box, Typography } from '@mui/material'
import { Contract } from '../../../types/contract'
import Barcode from 'react-barcode'

const PrintableContract = forwardRef<
  HTMLDivElement,
  {
    contract: Contract
  }
>(({ contract }, ref) => {
  return (
    <Box ref={ref} sx={{ p: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 4,
        }}
      >
        <Typography variant='h4' sx={{ mt: 4 }}>
          {'UGOVOR'}
        </Typography>

        <Box sx={{ mt: 4, pr: 2 }}>
          <Barcode
            value={contract?.referenceNumber || '0000000000'}
            height={40}
            width={0.7}
            fontSize={13}
            displayValue={true}
            margin={0}
          />
        </Box>
      </Box>
    </Box>
  )
})

PrintableContract.displayName = 'PrintableContract'

export default PrintableContract
