import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { PrimaryThemeColor, WhiteTeamColor } from '../consts/common'
import { ExpandableTypographyTableProps } from '../types/common'

const ExpandableTypographyTable = (props: ExpandableTypographyTableProps) => {
  const [expanded, setExpanded] = useState(false)
  const { title } = props

  const toggleExpand = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <Paper sx={{ width: '80%', margin: 'auto', padding: 2, backgroundColor: PrimaryThemeColor }}>
      <Box
        onClick={toggleExpand}
        sx={{
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingX: 2,
        }}
      >
        <Typography variant='h5' sx={{ color: WhiteTeamColor }}>
          {title.toUpperCase()}
        </Typography>
        <IconButton sx={{ color: WhiteTeamColor }}>{expanded ? <Remove /> : <Add />}</IconButton>
      </Box>

      {expanded && (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Custom Field 1</TableCell>
                <TableCell>Value 1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Custom Field 2</TableCell>
                <TableCell>Value 2</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  )
}

export default ExpandableTypographyTable
