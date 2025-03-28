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
import { EmptyValue, GridFieldTypes, PrimaryThemeColor, WhiteTeamColor } from '../consts/common'
import { ExpandableTypographyTableProps } from '../types/common'
import { useTranslation } from 'react-i18next'
import EntityDialog from './EntityDialog'
import { cleanEntityState } from '../features/entity.slice'
import { useAppDispatch } from '../app/hooks'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'

const ExpandableTable = (props: ExpandableTypographyTableProps) => {
  const [expanded, setExpanded] = useState(false)
  const { title, hideActionSection, moduleOption, expandableDialogAction, isLoading, columns, rows } = props
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
                    {columns.map((col) => (
                      <TableCell key={col.key}>{col.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {columns.map((col) => {
                        const gridFieldData = row[col.key]
                        if (gridFieldData.type === GridFieldTypes.LINK) {
                          return (
                            <TableCell key={col.key}>
                              {gridFieldData?.value ? (
                                <Link to={String(gridFieldData.link)}>{gridFieldData.value}</Link>
                              ) : (
                                EmptyValue
                              )}
                            </TableCell>
                          )
                        } else if (gridFieldData.type === GridFieldTypes.STRING) {
                          return <TableCell key={col.key}>{gridFieldData.value || EmptyValue}</TableCell>
                        }
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Paper>
      <EntityDialog
        title={dialogTitle}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        moduleOption={moduleOption}
        entityAction={expandableDialogAction}
      />
    </Grid>
  )
}

export default ExpandableTable
