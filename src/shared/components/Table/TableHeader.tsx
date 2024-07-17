import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { SortOrder } from '../../interfaces/TSortOrder'

interface TableHeaderProps<T> {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
  order: SortOrder
  orderBy: string
  data: T[]
}
export type TablePropsTT = Record<string, string | null | undefined>

// function TableHeader<T extends object>(props: TableHeaderProps<T>) {
function TableHeader(props: TableHeaderProps<TablePropsTT>) {
  const { order, orderBy, onRequestSort, data } = props

  console.log('table header', data)
  const createSortHandler =
    (property: keyof TablePropsTT) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  const keys = Object.keys(data[0])
  console.log(keys)
  return (
    <TableHead>
      <TableRow>
        {keys.map(cell => (
          <TableCell key={cell} sortDirection={orderBy === cell ? order : false} scope="col">
            <TableSortLabel
              active={orderBy === cell}
              direction={orderBy === cell ? order : 'asc'}
              onClick={createSortHandler(cell)}
            >
              {cell}
              {orderBy === cell ? (
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
