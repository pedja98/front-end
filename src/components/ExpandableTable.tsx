import React, { useState } from 'react'
import { Paper, Typography, Box, IconButton, Grid, Button } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { ExpandableTableRowPerPage, PrimaryThemeColor, WhiteTeamColor } from '../consts/common'
import { ExpandableTypographyTableProps } from '../types/common'
import Spinner from './Spinner'
import CustomTable from './CustomTable'

const ExpandableTable = (props: ExpandableTypographyTableProps) => {
  const [expanded, setExpanded] = useState(false)
  const { title, hideActionSection, expandableDialogAction, isLoading, columns, rows, actionText } = props

  const toggleExpand = () => {
    setExpanded((prev) => !prev)
  }

  const handleActionButtonClick = () => {
    if (expandableDialogAction) {
      expandableDialogAction()
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Grid>
      <Paper sx={{ width: '80%', margin: 'auto' }}>
        <Box
          onClick={toggleExpand}
          sx={{
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingX: 2,
            backgroundColor: PrimaryThemeColor,
          }}
        >
          <Typography variant='h6' sx={{ color: WhiteTeamColor }}>
            {title.toUpperCase()}
          </Typography>
          <IconButton sx={{ color: WhiteTeamColor }}>{expanded ? <Remove /> : <Add />}</IconButton>
        </Box>

        {expanded && (
          <Grid>
            {!hideActionSection && (
              <Grid sx={{ width: '100%', backgroundColor: WhiteTeamColor, mt: 0.5, pr: 0.5 }}>
                <Button
                  id='extended-table-create-action-btn'
                  sx={{ float: 'right', mb: 1 }}
                  onClick={handleActionButtonClick}
                >
                  {actionText}
                </Button>
              </Grid>
            )}
            <CustomTable columns={columns} rows={rows} rowPerPage={ExpandableTableRowPerPage} />
          </Grid>
        )}
      </Paper>
    </Grid>
  )
}

export default ExpandableTable
