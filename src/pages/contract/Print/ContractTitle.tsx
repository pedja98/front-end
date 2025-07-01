import { Box, Grid, Typography } from '@mui/material'
import Barcode from 'react-barcode'

const ContractTitle = ({ referenceNumber }: { referenceNumber: string }) => {
  return (
    <Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 4,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Barcode value={referenceNumber} height={40} width={0.7} fontSize={13} displayValue={true} margin={0} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Typography variant='h4'>{'UGOVOR O POSLOVNOJ SARADNJI'}</Typography>
      </Box>
    </Grid>
  )
}

export default ContractTitle
