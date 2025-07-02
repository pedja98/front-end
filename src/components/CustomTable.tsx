import { FC, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from '@mui/material'
import { EmptyValue, GridFieldTypes } from '../consts/common'
import { TableProps } from '../types/common'
import { TableLinkStyled } from '../styles/common'

const CustomTable: FC<TableProps> = ({ columns, rows, rowPerPage, printing }) => {
  const [page, setPage] = useState(0)

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const paginatedRows = rowPerPage ? rows.slice(page * rowPerPage, (page + 1) * rowPerPage) : rows

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 1,
        mb: 2,
        ...(printing && {
          boxShadow: 'none',
          elevation: 0,
          border: '1px solid #000',
        }),
      }}
    >
      <Table
        sx={{
          ...(printing && {
            '& .MuiTableCell-root': {
              border: '1px solid #000',
            },
            borderCollapse: 'collapse',
            width: '100%',
          }),
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  ...(printing && {
                    backgroundColor: '#000',
                    color: '#fff',
                    fontWeight: 'bold',
                    border: '1px solid #000',
                  }),
                }}
              >
                {col.text}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col) => {
                const gridFieldData = row[col.key]
                if (gridFieldData.type === GridFieldTypes.LINK) {
                  return (
                    <TableCell
                      key={col.key}
                      sx={{
                        ...(printing && {
                          border: '1px solid #000',
                        }),
                      }}
                    >
                      {gridFieldData?.value ? (
                        <TableLinkStyled to={String(gridFieldData.link)}>{gridFieldData.value}</TableLinkStyled>
                      ) : (
                        EmptyValue
                      )}
                    </TableCell>
                  )
                } else if (gridFieldData.type === GridFieldTypes.STRING) {
                  return (
                    <TableCell
                      key={col.key}
                      sx={{
                        ...(printing && {
                          border: '1px solid #000',
                        }),
                      }}
                    >
                      {gridFieldData.value || EmptyValue}
                    </TableCell>
                  )
                } else if (gridFieldData.type === GridFieldTypes.BUTTON) {
                  return (
                    <TableCell
                      key={col.key}
                      sx={{
                        ...(printing && {
                          border: '1px solid #000',
                        }),
                      }}
                    >
                      <Button
                        sx={{ minWidth: '50px', width: '110px' }}
                        onClick={() => {
                          if (gridFieldData.handleClick) {
                            gridFieldData.handleClick(gridFieldData.id as number)
                          }
                        }}
                      >
                        {col.text}
                      </Button>
                    </TableCell>
                  )
                }
                return null
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rowPerPage && !printing && (
        <TablePagination
          component='div'
          count={rows.length}
          rowsPerPage={rowPerPage}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[]}
        />
      )}
    </TableContainer>
  )
}

export default CustomTable
