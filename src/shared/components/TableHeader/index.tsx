import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
type SortKey = 'name' | 'description' | ''

type SortOrder = 'asc' | 'desc'
export interface Data {
  id: SortKey
  label: string
}

interface TableProps {
  // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onRequestSort: (event: React.MouseEvent<unknown>, property: SortKey) => void
  order: SortOrder
  orderBy: SortKey
  headCells: Data[]
}

function TableHeader(props: TableProps) {
  const { order, orderBy, onRequestSort, headCells } = props
  const createSortHandler =
    //   (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    (property: SortKey) => (event: React.MouseEvent<unknown>) => {
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
