import { FC } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material'
import { Link } from 'react-router-dom'
import { EmptyValue, GridFieldTypes } from '../consts/common'
import { TableProps } from '../types/common'

const CustomTable: FC<TableProps> = ({ columns, rows, currentPage, totalCount, rowsPerPage, onPageChange }) => {
  return (
    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
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
      <Pagination
        count={Math.ceil(totalCount / rowsPerPage)}
        page={currentPage}
        onChange={onPageChange}
        color='primary'
        sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
      />
    </TableContainer>
  )
}

export default CustomTable
