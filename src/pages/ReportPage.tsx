import { useState } from 'react'
import { Grid, Typography, Button, SelectChangeEvent } from '@mui/material'
import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useGetRegionsQuery } from '../app/apis/crm/region.api'
import { useGetShopsQuery } from '../app/apis/crm/shop.api'
import { ReportFormProps } from '../types/report'
import { ReportFormPropsInitialState } from '../consts/report'
import { createQueryParams } from '../helpers/common'
import { useGetContractReportQuery } from '../app/apis/crm/contract.api'
import { ChangeEvent } from 'react'
import GridField from '../components/GridField'
import { getReportGridData, getReportLabels } from '../transformers/reports'
import ReportTable from '../components/ReportTable'

const ReportPage = () => {
  const { t } = useTranslation()
  const [reportData, setReportData] = useState<ReportFormProps>(ReportFormPropsInitialState)
  const [skipGetReport, setSkipGetReport] = useState<boolean>(true)
  const [reportQueryParams, setReportQueryParams] = useState<string>('')

  const { isLoading: isLoadingGetContractReports, data: contractReportData } = useGetContractReportQuery(
    reportQueryParams,
    {
      skip: skipGetReport,
    },
  )

  const { data: regions = [] } = useGetRegionsQuery('', {
    selectFromResult: ({ data }) => ({
      data: data?.map(({ id, name }) => ({ id, name })) || [],
    }),
  })

  const { data: shops = [] } = useGetShopsQuery('', {
    selectFromResult: ({ data }) => ({
      data: data?.map(({ id, name }) => ({ id, name })) || [],
    }),
  })

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]> | SelectChangeEvent<string | string[]>,
  ) => {
    const { name, value } = event.target
    setReportData((prev) => ({
      ...prev,
      [name]: typeof value === 'string' ? value.split(',') : value,
    }))
  }

  const handleDateChange = (newValue: Dayjs | null, fieldName: string) => {
    setReportData((prev) => ({
      ...prev,
      [fieldName]: newValue ? newValue.toISOString() : null,
    }))
  }

  const handleGetReport = () => {
    setReportQueryParams(createQueryParams(reportData))
    setSkipGetReport(false)
  }

  const labels = getReportLabels(t)
  const reportGridData = getReportGridData(reportData, regions, shops, t)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant='h4'
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            textAlign: { xs: 'center', sm: 'left' },
            mb: { xs: 2, sm: 1 },
          }}
        >
          {t('pageNamesAndActions.reports')}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          wrap='nowrap'
          sx={{
            overflowX: 'auto',
            px: 1,
          }}
        >
          {labels.map((label) => {
            const gridFieldData = reportGridData[label.key]
            return (
              <Grid item xs={2} key={label.key} sx={{ minWidth: 200 }}>
                <GridField
                  gridFieldData={gridFieldData}
                  label={label}
                  handleChange={handleChange}
                  handleChangeDateTimePicker={handleDateChange}
                />
              </Grid>
            )
          })}

          <Grid
            item
            xs={2}
            sx={{
              minWidth: 200,
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={handleGetReport}
              sx={{
                width: '100%',
                height: 56,
                fontSize: '1rem',
              }}
            >
              {t('reports:getReport')}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <ReportTable isLoadingReportData={isLoadingGetContractReports} contractReportData={contractReportData || []} />
      </Grid>
    </Grid>
  )
}

export default ReportPage
