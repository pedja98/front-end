import { Grid } from '@mui/material'
import { useGetCharacteristicsByTariffPlanIdentifierQuery } from '../../../../app/apis/core/pc.api'
import { getTariffPlanCharTableColumn, transformTariffPlanCharTableRows } from '../../../../transformers/contract'
import CustomTable from '../../../../components/CustomTable'

const TariffPlanCharTable = ({ tariffPlanIdentifier }: { tariffPlanIdentifier: string }) => {
  const { data: tariffPlanCharData } = useGetCharacteristicsByTariffPlanIdentifierQuery(tariffPlanIdentifier)
  const columns = getTariffPlanCharTableColumn(String(tariffPlanCharData?.tariffPlan.name.sr))
  const rows = tariffPlanCharData?.characteristics.map((char) => transformTariffPlanCharTableRows(char)) || []

  return (
    <Grid>
      <CustomTable columns={columns} rows={rows} printing={true} />
    </Grid>
  )
}

export default TariffPlanCharTable
