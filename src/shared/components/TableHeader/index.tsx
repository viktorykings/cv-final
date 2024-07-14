import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { SortOrder } from '../../interfaces/TSortOrder'
import { HeadCell } from '../THeadCells'
import { TCvsTableHeaderProps } from '../../interfaces/TSort'

interface TableProps {
  // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TCvsTableHeaderProps) => void
  order: SortOrder
  orderBy: string
  headCells: HeadCell[]
}

function TableHeader(props: TableProps) {
  const { order, orderBy, onRequestSort, headCells } = props
  const createSortHandler =
    //   (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    (property: keyof TCvsTableHeaderProps) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
export default TableHeader
