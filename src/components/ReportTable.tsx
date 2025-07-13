import { useTranslation } from 'react-i18next'
import { ContractReport } from '../types/contract'
import Spinner from './Spinner'
import { getReportTableColumns, transformReportTableRow } from '../transformers/reports'
import { Grid } from '@mui/material'
import { TableRowPerPage } from '../consts/common'
import CustomTable from './CustomTable'

const ReportTable = ({
  isLoadingReportData,
  contractReportData,
}: {
  isLoadingReportData: boolean
  contractReportData: ContractReport[]
}) => {
  const { t } = useTranslation()

  if (isLoadingReportData) {
    return <Spinner />
  }
  const columns = getReportTableColumns(t)
  const rows = contractReportData.map((elem) => transformReportTableRow(elem, t))

  return (
    <Grid>
      <CustomTable columns={columns} rows={rows} rowPerPage={TableRowPerPage} />
    </Grid>
  )
}

export default ReportTable
