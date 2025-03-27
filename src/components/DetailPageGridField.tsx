import { Grid, TextField, Typography } from '@mui/material'
import { EmptyValue, GridFieldTypes } from '../consts/common'
import { DetailPageGridFieldProps, GridFieldType } from '../types/common'
import { LinkStyled } from '../styles/common'

const DetailPageGridField = ({ gridFieldData, label }: DetailPageGridFieldProps) => {
  const isArea = gridFieldData.type === GridFieldTypes.AREA
  const isTextField = ([GridFieldTypes.STRING, GridFieldTypes.AREA] as GridFieldType[]).includes(gridFieldData.type)
  const isLink = gridFieldData.type === GridFieldTypes.LINK && gridFieldData.value

  return (
    <Grid item xs={12} sm={isArea ? 12 : 6} key={label.key}>
      <Grid container alignItems='center' sx={{ height: '50px' }}>
        <Grid item sx={{ minWidth: 120 }}>
          <Typography variant='subtitle1'>{label.label}</Typography>
        </Grid>
        <Grid item xs>
          {isTextField ? (
            <TextField
              fullWidth
              value={gridFieldData.value || EmptyValue}
              variant='outlined'
              disabled
              InputProps={{ readOnly: true }}
            />
          ) : isLink ? (
            <LinkStyled to={String(gridFieldData.link)}>{gridFieldData.value}</LinkStyled>
          ) : (
            <TextField fullWidth value={EmptyValue} variant='outlined' disabled InputProps={{ readOnly: true }} />
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DetailPageGridField
