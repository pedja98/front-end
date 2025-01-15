import { Grid, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { BasicTabProps, TabPanelProps } from '../types/common'

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <Grid
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Grid>{children}</Grid>}
    </Grid>
  )
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

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
            <Tab sx={{ color: 'black' }} key={index} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Grid>
      <Grid sx={{ width: '70%' }}>
        {labels.map((label, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {tabs[label]}
          </CustomTabPanel>
        ))}
      </Grid>
    </Grid>
  )
}

export default BasicTabs
