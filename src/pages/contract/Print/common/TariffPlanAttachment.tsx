import { Grid, Typography } from '@mui/material'
import { useGetGroupedTariffPlansByCrmOfferIdQuery } from '../../../../app/apis/core/om.api'
import CustomTable from '../../../../components/CustomTable'
import {
  getPrintTariffPlanCountTableColumns,
  transformPrintTariffPlanCountTableRows,
} from '../../../../transformers/contract'
import TariffPlanCharTable from './TariffPlanCharTable'

const TariffPlanAttachment = ({ offerId }: { offerId: number }) => {
  const { data: groupTps } = useGetGroupedTariffPlansByCrmOfferIdQuery(Number(offerId))

  const activeColumns = getPrintTariffPlanCountTableColumns()
  const activeRows =
    groupTps?.activeTariffPlans.map((tariffPlan) => transformPrintTariffPlanCountTableRows(tariffPlan)) || []

  return (
    <Grid>
      <Typography variant='subtitle1'>{'Prilog 1 – Tabela tarifnih planova i količina'}</Typography>
      <Grid sx={{ width: '400px' }}>
        <CustomTable columns={activeColumns} rows={activeRows} printing={true} />
      </Grid>
      <Grid sx={{ width: '400px' }}>
        <Typography variant='subtitle1'>{'Prilog 2 – Karakteristike tarifnih planova'}</Typography>
        {groupTps?.activeTariffPlans.map((tp) => (
          <TariffPlanCharTable key={tp.identifier} tariffPlanIdentifier={tp.identifier} />
        ))}
      </Grid>
    </Grid>
  )
}

export default TariffPlanAttachment
