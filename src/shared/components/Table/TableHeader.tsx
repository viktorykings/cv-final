import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { SortOrder } from '../../interfaces/TSortOrder'
import { TProps } from './types/TableProps'
import { useTranslation } from 'react-i18next'

interface TableHeaderProps<T> {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
  order: SortOrder
  orderBy: string
  data: T[]
}

function TableHeader(props: TableHeaderProps<TProps>) {
  const { order, orderBy, onRequestSort, data } = props
  const { t } = useTranslation()

  const createSortHandler = (property: keyof TProps) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  const isNotSortable = (str: string) => {
    return str !== 'id' && str !== 'avatar'
  }
  const keys = Object.keys(data[0]).map(el => {
    return {
      key: el,
      label: el
    }
  })
  return (
    <TableHead>
      <TableRow>
        {keys.map(cell => (
          <TableCell
            key={cell.key}
            sortDirection={orderBy === cell.label ? order : false}
            scope="col"
          >
            {isNotSortable(cell.key) && (
              <TableSortLabel
                active={orderBy === cell.label}
                direction={orderBy === cell.label ? order : 'asc'}
                onClick={createSortHandler(cell.label)}
              >
                {t(`tableHeadLabels.${cell.label}`, 'tableHeadLabels.error')}
                {orderBy === cell.label ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
export default TableHeader
