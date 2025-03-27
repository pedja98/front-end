import { Grid, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { BasicTabProps } from '../types/common'

const BasicTabs = ({ tabs }: BasicTabProps) => {
  const [value, setValue] = useState(0)
  const labels = Object.keys(tabs)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid
      container
      sx={{
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        mt: 3,
      }}
    >
      <Grid sx={{ width: '70%', mb: 3 }}>
        <Tabs value={value} onChange={handleChange}>
          {labels.map((label, index) => (
            <Tab
              sx={{ color: 'black' }}
              key={index}
              label={label}
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Grid>
      <Grid sx={{ width: '70%' }}>
        {labels.map((label, index) => (value === index ? <Grid key={index}>{tabs[label]}</Grid> : null))}
      </Grid>
    </Grid>
  )
}

export default BasicTabs
