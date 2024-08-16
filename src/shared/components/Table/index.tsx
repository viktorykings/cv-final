import { Table, TableBody, TableContainer } from '@mui/material'
import { SortOrder } from '../../interfaces/TSortOrder'
import { useEffect, useMemo, useState } from 'react'
import customFilter from '../../utils/customFilter'
import getComparator from '../../utils/customSort'
import TableItem from './TableItem'
import TableHeader from './TableHeader'
import { ComparatorProps, IContextMenuItem, TProps } from './types/TableProps'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { updateQueryParams } from '../../utils/updateQueryParams'

interface TableProps<T> {
  headers?: T[]
  data: T[]
  constextMenu?: IContextMenuItem[]
  searchQuery: string
  setSearchQuery: (s: string) => void
}

const CustomTable = (props: TableProps<TProps>) => {
  const { data, constextMenu, searchQuery, headers, setSearchQuery } = props
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialOrder = (searchParams.get('order') || 'asc') as SortOrder
  const initialOrderBy = (searchParams.get('sort') || 'id') as keyof TProps
  const initialSearchQuery = searchParams.get('filter')

  const [order, setOrder] = useState<SortOrder>(initialOrder)
  const [orderBy, setOrderBy] = useState<keyof TProps>(initialOrderBy)

  const handleRequestSort = (event: React.MouseEvent<unknown>, path: keyof TProps): void => {
    event.preventDefault()
    if (path === orderBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderBy(path)
      setOrder(order === 'asc' ? 'desc' : 'asc')
    }
    const newSearchParams = new URLSearchParams(searchParams.toString())
    updateQueryParams(newSearchParams, 'sort', path)
    updateQueryParams(newSearchParams, 'order', order)
    setSearchParams(newSearchParams)
    navigate({
      search: newSearchParams.toString()
    })
  }
  useEffect(() => {
    if (initialSearchQuery) setSearchQuery(initialSearchQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    if (!initialSearchQuery) updateQueryParams(newSearchParams, 'filter')
    updateQueryParams(newSearchParams, 'filter', searchQuery)
    setSearchParams(newSearchParams)
    navigate({
      search: newSearchParams.toString()
    })
  }, [searchParams, searchQuery, setSearchParams, setSearchQuery, initialSearchQuery, navigate])
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
            data={headers ? headers : data}
            onRequestSort={handleRequestSort}
          />
          {data.length ? (
            <TableBody>
              {visibleRows.map(el => (
                <TableItem key={el.id ?? el.delete} row={el} contextMenu={constextMenu} />
              ))}
            </TableBody>
          ) : (
            <></>
          )}
        </Table>
      </TableContainer>
    </>
  )
}
export default CustomTable
