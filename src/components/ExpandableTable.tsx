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
  Grid,
  Button,
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { PrimaryThemeColor, WhiteTeamColor } from '../consts/common'
import { ExpandableTypographyTableProps } from '../types/common'
import { useTranslation } from 'react-i18next'
import EntityDialog from './EntityDialog'
import { cleanEntityState } from '../features/entity.slice'
import { useAppDispatch } from '../app/hooks'

const ExpandableTable = (props: ExpandableTypographyTableProps) => {
  const [expanded, setExpanded] = useState(false)
  const { title, hideActionSection, moduleOption } = props
  const { t } = useTranslation()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const dispatch = useAppDispatch()

  const toggleExpand = () => {
    setExpanded((prev) => !prev)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const handleCreateButtonClick = () => {
    dispatch(cleanEntityState())
    setDialogTitle((t('create') + ' ' + title).toUpperCase())
    setDialogOpen(true)
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
                  onClick={handleCreateButtonClick}
                >
                  {t('general:create')}
                </Button>
              </Grid>
            )}
            <TableContainer component={Paper} sx={{ mt: 1 }}>
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
          </Grid>
        )}
      </Paper>
      <EntityDialog title={dialogTitle} isOpen={isDialogOpen} onClose={handleCloseDialog} moduleOption={moduleOption} />
    </Grid>
  )
}

export default ExpandableTable
