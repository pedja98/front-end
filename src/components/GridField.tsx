import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { GridFieldProps, GridFieldType } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { ChangeEvent } from 'react'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const GridField = (props: GridFieldProps) => {
  const { gridFieldData, handleChange, label, handleChangeDateTimePicker } = props

  if (
    (
      [GridFieldTypes.STRING, GridFieldTypes.NUMBER, GridFieldTypes.PASSWORD, GridFieldTypes.AREA] as GridFieldType[]
    ).includes(gridFieldData.type)
  ) {
    const isArea = gridFieldData.type === GridFieldTypes.AREA
    return (
      <Grid item sx={{ width: '100%' }} key={label.key}>
        <TextField
          id={label.key}
          name={label.key}
          label={label.label}
          disabled={gridFieldData.disabled}
          variant='standard'
          type={gridFieldData.type === GridFieldTypes.PASSWORD ? 'password' : undefined}
          required={!!gridFieldData.required}
          value={gridFieldData.value}
          sx={{ width: '100%' }}
          minRows={isArea ? 4 : 0}
          multiline={isArea}
          onChange={handleChange ? (event: ChangeEvent<HTMLInputElement>) => handleChange(event) : undefined}
        />
      </Grid>
    )
  }
  if (gridFieldData.type === GridFieldTypes.SELECT && gridFieldData?.options) {
    return (
      <Grid item sx={{ width: '100%', mb: 1 }} key={label.key}>
        <FormControl sx={{ width: '100%' }} variant='standard' disabled={gridFieldData.disabled}>
          <InputLabel
            id={label.key}
            sx={{ pl: gridFieldData.selectDialogField ? 2.5 : 9.3 }}
            required={gridFieldData.required}
          >
            {label.label}
          </InputLabel>
          <Select
            labelId={label.key}
            id={label.key}
            name={label.key}
            value={String(gridFieldData.value || '')}
            variant='standard'
            sx={{ width: '100%' }}
            onChange={handleChange ? (event: SelectChangeEvent<string>) => handleChange(event) : undefined}
          >
            {gridFieldData?.options.map((option, index) => (
              <MenuItem key={index} value={gridFieldData?.optionsValues?.[index] ?? ''}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    )
  }
  if (gridFieldData.type === GridFieldTypes.AUTOCOMPLETE && gridFieldData?.autocompleteMap) {
    return (
      <Grid item sx={{ width: '100%', mb: 1 }} key={label.key}>
        <FormControl sx={{ width: '100%' }} variant='standard'>
          <Autocomplete
            id={label.key}
            value={
              Object.keys(gridFieldData.autocompleteMap || {}).find(
                (key) => (gridFieldData.autocompleteMap || {})?.[key] === Number(gridFieldData.value),
              ) || null
            }
            options={Object.keys(gridFieldData.autocompleteMap || {})}
            disabled={gridFieldData.disabled}
            getOptionLabel={(option) => (option !== undefined ? String(option) : '')}
            onChange={(_, key) => {
              if (handleChange) {
                handleChange({
                  target: { name: label.key, value: gridFieldData?.autocompleteMap?.[String(key)] },
                } as ChangeEvent<HTMLInputElement>)
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label={label.label} variant='standard' required={gridFieldData.required} />
            )}
            isOptionEqualToValue={(option, value) => option === value}
            sx={{ width: '100%' }}
          />
        </FormControl>
      </Grid>
    )
  }
  if (gridFieldData.type === GridFieldTypes.DATE_TIME) {
    return (
      <Grid item sx={{ width: '100%', mb: 1 }} key={label.key}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            name={label.key}
            label={label.label}
            format='YYYY-MM-DD HH:mm'
            ampm={false}
            disabled={gridFieldData.disabled}
            value={gridFieldData.value ? dayjs(gridFieldData.value) : null}
            onChange={(newValue) => {
              if (handleChangeDateTimePicker) {
                handleChangeDateTimePicker(newValue, label.key)
              }
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                required: !!gridFieldData.required,
                id: label.key,
              },
              digitalClockItem: {},
            }}
          />
        </LocalizationProvider>
      </Grid>
    )
  }
  return <Grid key={label.key}></Grid>
}

export default GridField
