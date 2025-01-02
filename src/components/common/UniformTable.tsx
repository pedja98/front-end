import { FC } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import { EmptyValue } from '../../consts/common'
import { TableProps } from '../../types/common'

const UniformTable: FC<TableProps> = ({ columns, rows }) => {
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
                const cellData = row[col.key]
                if (!(cellData instanceof Object)) {
                  return <TableCell key={col.key}> {cellData || EmptyValue} </TableCell>
                }
                return (
                  <TableCell key={col.key}>
                    {cellData?.value ? <Link to={cellData.link}>{cellData.value}</Link> : EmptyValue}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UniformTable