import { Grid, TextField, Typography } from '@mui/material'
import { EmptyValue, GridFieldTypes } from '../consts/common'
import { DetailPageGridFieldProps, GridFieldType } from '../types/common'
import { LinkStyled } from '../styles/common'

const DetailPageGridField = (props: DetailPageGridFieldProps) => {
  const { gridFieldData, label } = props
  const isArea = gridFieldData.type === GridFieldTypes.AREA

  return (
    <Grid item xs={12} sm={isArea ? 12 : 6} key={label.key}>
      <Grid container alignItems='center' sx={{ height: '50px' }}>
        <Grid item sx={{ minWidth: 120 }}>
          <Typography variant='subtitle1'>{label.label}</Typography>
        </Grid>
        <Grid item xs>
          <Grid item xs>
            {(() => {
              if (([GridFieldTypes.STRING, GridFieldTypes.AREA] as GridFieldType[]).includes(gridFieldData.type)) {
                return (
                  <TextField
                    fullWidth
                    value={gridFieldData.value || EmptyValue}
                    variant='outlined'
                    disabled
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )
              } else if (gridFieldData.type === GridFieldTypes.LINK && gridFieldData.value) {
                return <LinkStyled to={String(gridFieldData.link)}>{gridFieldData.value}</LinkStyled>
              } else {
                return (
                  <TextField
                    fullWidth
                    value={EmptyValue}
                    variant='outlined'
                    disabled
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )
              }
            })()}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DetailPageGridField
