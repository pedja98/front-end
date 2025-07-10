import { useState } from 'react'
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
  Button,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useGetRegionsQuery } from '../app/apis/crm/region.api'
import { useGetShopsQuery } from '../app/apis/crm/shop.api'
import { ReportFormProps } from '../types/report'
import { ReportFormPropsInitialState } from '../consts/report'
import { DatePicker } from '@mui/x-date-pickers'
import { OpportunityType } from '../types/opportunity'
import { createQueryParamsForSearch } from '../helpers/common'

const ReportPage = () => {
  const { t } = useTranslation()
  const [selectedData, setSelectedData] = useState<ReportFormProps>(ReportFormPropsInitialState)

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

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const { name, value } = event.target
    setSelectedData((prev) => ({
      ...prev,
      [name]: typeof value === 'string' ? value.split(',') : value,
    }))
  }

  const handleOpportunityTypeChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target
    setSelectedData((prev) => ({
      ...prev,
      opportunityTypes: typeof value === 'string' ? value.split(',') : value,
    }))
  }

  const handleDateChange = (newValue: Dayjs | null, fieldName: string) => {
    setSelectedData((prev) => ({
      ...prev,
      [fieldName]: newValue ? newValue.toISOString() : null,
    }))
  }

  const handleGetReport = () => {
    const queryParams = createQueryParamsForSearch(selectedData)
    console.log('Getting report with filters:', queryParams)
  }

  const renderSelectedValues = (
    selected: string[],
    dataSource: {
      id: number
      name: string
    }[],
  ) => {
    if (selected.length === 0) return ''
    return selected
      .map((id) => dataSource.find((item) => String(item.id) === id)?.name)
      .filter(Boolean)
      .join(', ')
  }

  const renderOpportunityTypeValues = (selected: string[]) => {
    if (selected.length === 0) return ''
    return selected.map((type) => t(`opportunities:opportunityTypes.${type.toLowerCase()}`)).join(', ')
  }

  const opportunityTypeOptions = Object.keys(OpportunityType).map((type) => ({
    value: type,
    label: t(`opportunities:opportunityTypes.${type.toLowerCase()}`),
  }))

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
          spacing={{ xs: 2, md: 3 }}
          sx={{
            px: { xs: 1, sm: 1 },
          }}
        >
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <FormControl sx={{ width: '100%' }} variant='standard'>
              <InputLabel id='opportunity-type-select-label'>{t('reports:opportunityTypes')}</InputLabel>
              <Select
                labelId='opportunity-type-select-label'
                id='opportunityTypes'
                name='opportunityTypes'
                multiple
                value={selectedData.opportunityTypes || []}
                onChange={handleOpportunityTypeChange}
                renderValue={(selected) => renderOpportunityTypeValues(selected)}
              >
                {opportunityTypeOptions.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    <Checkbox checked={(selectedData.opportunityTypes || []).includes(value)} />
                    <ListItemText primary={label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <FormControl sx={{ width: '100%' }} variant='standard'>
              <InputLabel id='region-select-label'>{t('reports:regions')}</InputLabel>
              <Select
                labelId='region-select-label'
                id='regions'
                name='regions'
                multiple
                value={selectedData.regions}
                onChange={handleChange}
                renderValue={(selected) => renderSelectedValues(selected, regions)}
                sx={{
                  '& .MuiSelect-select': {
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  },
                }}
              >
                {regions.map(({ id, name }) => (
                  <MenuItem key={id} value={String(id)}>
                    <Checkbox checked={selectedData.regions.includes(String(id))} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <FormControl sx={{ width: '100%' }} variant='standard'>
              <InputLabel id='shop-select-label'>{t('reports:shops')}</InputLabel>
              <Select
                labelId='shop-select-label'
                id='shops'
                name='shops'
                multiple
                value={selectedData.shops}
                onChange={handleChange}
                renderValue={(selected) => renderSelectedValues(selected, shops)}
                sx={{
                  '& .MuiSelect-select': {
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  },
                }}
              >
                {shops.map(({ id, name }) => (
                  <MenuItem key={id} value={String(id)}>
                    <Checkbox checked={selectedData.shops.includes(String(id))} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name='signatureStartDate'
                label={t('reports:signatureStartDate')}
                format='DD/MM/YYYY'
                value={selectedData.signatureStartDate ? dayjs(selectedData.signatureStartDate) : null}
                onChange={(newValue) => handleDateChange(newValue, 'signatureStartDate')}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'standard',
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          {/* End Date */}
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name='signatureEndDate'
                label={t('reports:signatureEndDate')}
                format='DD/MM/YYYY'
                value={selectedData.signatureEndDate ? dayjs(selectedData.signatureEndDate) : null}
                onChange={(newValue) => handleDateChange(newValue, 'signatureEndDate')}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'standard',
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2}
            sx={{
              display: 'flex',
              alignItems: { xs: 'center', lg: 'flex-end' },
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={handleGetReport}
              sx={{
                width: { xs: '100%', sm: '100%' },
                height: { xs: '48px', sm: '56px' },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                mt: { xs: 2, lg: 0 },
              }}
            >
              {t('reports:getReport')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ReportPage
