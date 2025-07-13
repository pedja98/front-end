import { useTranslation } from 'react-i18next'
import { ContractReport } from '../types/contract'
import Spinner from './Spinner'
import { getReportTableColumns, transformReportTableRow } from '../transformers/reports'
import { Grid, Button, Stack } from '@mui/material'
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

  const handleExportToCSV = () => {
    const header = columns.map((col) => `"${col.text}"`).join(',')
    const data = rows.map((row) => columns.map((col) => `"${row[col.key]?.value ?? ''}"`).join(','))
    const csvContent = [header, ...data].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'report.csv'
    link.click()
  }

  const handleExportToXLSX = () => {
    const header = `<tr>${columns.map((col) => `<th>${col.text}</th>`).join('')}</tr>`
    const dataRows = rows.map(
      (row) => `<tr>${columns.map((col) => `<td>${row[col.key]?.value ?? ''}</td>`).join('')}</tr>`,
    )
    const htmlTable = `<table>${header}${dataRows.join('')}</table>`
    const htmlBlob = new Blob([htmlTable], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(htmlBlob)
    link.download = 'report.xls'
    link.click()
  }

  const disableExportActions = rows.length === 0

  return (
    <Grid>
      <Stack direction='row' spacing={2} mb={2} ml={2}>
        <Button onClick={handleExportToCSV} variant='contained' color='primary' disabled={disableExportActions}>
          {t('reports:exportCSV')}
        </Button>
        <Button onClick={handleExportToXLSX} variant='contained' color='primary' disabled={disableExportActions}>
          {t('reports:exportXLS')}
        </Button>
      </Stack>
      <CustomTable columns={columns} rows={rows} rowPerPage={TableRowPerPage} />
    </Grid>
  )
}

export default ReportTable
