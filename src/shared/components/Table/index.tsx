import { Table, TableBody, TableContainer } from '@mui/material'
import { SortOrder } from '../../interfaces/TSortOrder'
import { useMemo, useState } from 'react'
import customFilter from '../../utils/customFilter'
import getComparator from '../../utils/customSort'
import TableItem from './TableItem'
import TableHeader from './TableHeader'

export type TProps = Record<string, string | null | undefined>
export type ComparatorProps = {
  [key in keyof TProps]: string | null | undefined
}

interface TableProps<T> {
  data: T[]
  searchQuery: string
}

const CustomTable = (props: TableProps<TProps>) => {
  const { data, searchQuery } = props

  const [order, setOrder] = useState<SortOrder>('asc')
  const [orderBy, setOrderBy] = useState<keyof TProps>('id')
  // TODO FILTER AND SORT IN QUERY PARAMS

  const handleRequestSort = (event: React.MouseEvent<unknown>, path: keyof TProps): void => {
    event.preventDefault()
    if (path === orderBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderBy(path)
      setOrder('asc')
    }
  }
  const visibleRows: TProps[] = useMemo(() => {
    const filtered = customFilter(data, searchQuery)
    return filtered
      .slice()
      .sort(getComparator(order, orderBy) as (a: ComparatorProps, b: ComparatorProps) => number)
  }, [order, orderBy, data, searchQuery])

  return (
    <>
      <TableContainer component={'div'} sx={{ background: 'transparent', width: ' 100%' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple">
          <TableHeader
            order={order}
            orderBy={orderBy}
            data={data}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {visibleRows.map(el => (
              <TableItem key={el.id} row={el} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default CustomTable
