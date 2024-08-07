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
}

const CustomTable = (props: TableProps<TProps>) => {
  const { data, constextMenu, searchQuery, headers } = props

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const initialOrder = (searchParams.get('order') || 'asc') as SortOrder
  const initialOrderBy = (searchParams.get('sort') || 'id') as keyof TProps
  const initialSearchQuery = searchParams.get('filter') || searchQuery

  const [order, setOrder] = useState<SortOrder>(initialOrder)
  const [orderBy, setOrderBy] = useState<keyof TProps>(initialOrderBy)
  const [paramsSearchQuery, setSearchQuery] = useState<string>(initialSearchQuery)

  const handleRequestSort = (event: React.MouseEvent<unknown>, path: keyof TProps): void => {
    event.preventDefault()
    if (path === orderBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderBy(path)
      setOrder('asc')
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
    const newSearchParams = new URLSearchParams(searchParams.toString())
    updateQueryParams(newSearchParams, 'filter', paramsSearchQuery)
    if (!searchQuery) updateQueryParams(newSearchParams, 'filter')
    setSearchParams(newSearchParams)
    navigate({
      search: newSearchParams.toString()
    })
    if (searchQuery !== '') setSearchQuery(searchQuery)
  }, [paramsSearchQuery, searchParams, searchQuery, setSearchParams, navigate])

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
            // data={data}
            onRequestSort={handleRequestSort}
          />
          {data.length ? (
            <TableBody>
              {visibleRows.map(el => (
                <TableItem key={el.id} row={el} contextMenu={constextMenu} />
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
