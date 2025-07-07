import { Grid, Typography } from '@mui/material'
import { useGetGroupedTariffPlansByCrmOfferIdQuery } from '../../../../app/apis/core/om.api'
import CustomTable from '../../../../components/CustomTable'
import {
  getPrintTariffPlanCountTableColumns,
  transformPrintTariffPlanCountTableRows,
} from '../../../../transformers/contract'
import TariffPlanCharTable from './TariffPlanCharTable'
import { Addon } from '../../../../types/tariffPlans'
import TariffPlanAddonTable from './TariffPlanAddonTable'

const TariffPlanAttachment = ({ offerId }: { offerId: number }) => {
  const { data: groupTpsData } = useGetGroupedTariffPlansByCrmOfferIdQuery(Number(offerId))

  const activeColumns = getPrintTariffPlanCountTableColumns()
  const activeRows =
    groupTpsData?.activeTariffPlans.map((tariffPlan) =>
      transformPrintTariffPlanCountTableRows(tariffPlan, Number(groupTpsData?.activeDiscounts[tariffPlan.identifier])),
    ) || []

  const shouldShowAddonTable = Object.values(
    (groupTpsData?.activeTariffPlansAddons as Record<string, Addon[]>) || {},
  ).some((addon) => addon.length > 0)

  const deactivatedColumns = getPrintTariffPlanCountTableColumns()
  const deactivatedRows =
    groupTpsData?.deactivatedTariffPlans.map((tariffPlan) =>
      transformPrintTariffPlanCountTableRows(tariffPlan, Number(groupTpsData?.activeDiscounts[tariffPlan.identifier])),
    ) || []
  return (
    <Grid>
      <Typography variant='subtitle1'>{'Prilog 1 – Tabela tarifnih planova i količina'}</Typography>
      <Grid sx={{ width: '400px' }}>
        <CustomTable columns={activeColumns} rows={activeRows} printing={true} />
        {(groupTpsData?.deactivatedTariffPlans || []).length > 0 && (
          <>
            <Typography variant='subtitle2'>{'Deaktivirani tarifni planovi'}</Typography>
            <CustomTable columns={deactivatedColumns} rows={deactivatedRows} printing={true} />
          </>
        )}
      </Grid>
      <Grid sx={{ width: '400px' }}>
        <Typography variant='subtitle1'>{'Prilog 2 – Karakteristike tarifnih planova'}</Typography>
        {groupTpsData?.activeTariffPlans.map((tp) => (
          <TariffPlanCharTable key={tp.identifier} tariffPlanIdentifier={tp.identifier} />
        ))}
      </Grid>
      {shouldShowAddonTable && (
        <Grid sx={{ width: '400px' }}>
          <Typography variant='subtitle1'>{'Prilog 3 – Tabela tarifnih dodataka'}</Typography>
          {Object.entries((groupTpsData?.activeTariffPlansAddons as Record<string, Addon[]>) || {}).map(
            ([identifier, addons]) =>
              addons.length > 0 && (
                <TariffPlanAddonTable
                  key={identifier}
                  tariffPlanName={
                    groupTpsData?.activeTariffPlans.find((tp) => tp.identifier === identifier)?.name.sr as string
                  }
                  addons={addons}
                />
              ),
          )}
        </Grid>
      )}
    </Grid>
  )
}

export default TariffPlanAttachment
