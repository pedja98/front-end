import { Grid, Typography } from '@mui/material'
import { Addon } from '../../../../types/tariffPlans'
import {
  getPrintTariffPlanAddonTableColumns,
  transformPrintTariffPlanAddonTableRows,
} from '../../../../transformers/contract'
import CustomTable from '../../../../components/CustomTable'

const TariffPlanAddonTable = ({ tariffPlanName, addons }: { tariffPlanName: string; addons: Addon[] }) => {
  const columns = getPrintTariffPlanAddonTableColumns()
  const rows = addons.map((addon) => transformPrintTariffPlanAddonTableRows(addon))

  return (
    <Grid>
      <Typography variant='subtitle1'>{`Dodaci uz tarifni plan ${tariffPlanName}`}</Typography>
      <CustomTable columns={columns} rows={rows} printing={true} />
    </Grid>
  )
}

export default TariffPlanAddonTable
