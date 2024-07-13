import { TableContainer, Table, TableBody, Button, Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import SearchBar from '../../../shared/components/Search'
import { useCallback, useMemo, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useGetUser } from '../../../graphql/users/hooks/useGetUser'
import { userID } from '../../../shared/constants'
import CvItem from './CvItem'
import AddIcon from '@mui/icons-material/Add'
import TableHeader, { Data } from '../../../shared/components/TableHeader'
import { ICV } from '../../../shared/interfaces/ICV'

const headerCells: Data[] = [
  {
    id: 'name' as const,
    label: 'Name'
  },
  {
    id: 'description' as const,
    label: 'Description'
  },
  {
    id: '',
    label: ''
  }
]
type SortKey = 'name' | 'description' | ''
type SortOrder = 'asc' | 'desc'

const CvsTable = () => {
  const { id } = useParams()
  const { data: user } = useGetUser(id as string)
  const currentUserID = useReactiveVar(userID)
  const isCurrentUserProfile = currentUserID === user?.user.id

  const [searchQuery, setSearchQuery] = useState('')

  const [order, setOrder] = useState<SortOrder>('asc')
  const [orderBy, setOrderBy] = useState<SortKey>('name')
  // const [selected, setSelected] = useState<readonly number[]>([]);
  const filterData = (query: string, data: ICV[] | undefined) => {
    if (!data) return

    if (!query) {
      return data
    } else {
      return data.filter(
        d => d.name?.toLowerCase().includes(query) || d.description?.toLowerCase().includes(query)
      )
    }
  }

  const sort = (valueA: string | undefined, valueB: string | undefined, sortOrder: string) => {
    if (valueA === valueB) return 0

    if (!valueA) return 1

    if (!valueB) return -1
    if (sortOrder === 'asc') return valueA < valueB ? -1 : 1
    else return valueA > valueB ? -1 : 1
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: SortKey) => {
    event.preventDefault()
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortData = useCallback(
    (data: ICV[] | undefined, sortKey: SortKey, sortOrder: SortOrder) => {
      if (!data) return
      if (!sortKey) return data
      const dataToSort = [...data]
      return dataToSort.sort((a, b) => sort(a[sortKey], b[sortKey], sortOrder))
    },
    []
  )
  const filtered = filterData(searchQuery, user?.user.cvs)

  const visibleRows = useMemo(() => {
    return filtered?.length
      ? sortData(filtered, orderBy, order)
      : sortData(user?.user.cvs, orderBy, order)
  }, [filtered, order, orderBy, user?.user.cvs, sortData])
  // useEffect(() => {
  //   if (user) console.log(user.user.cvs)
  //   if (user && user?.user.cvs) console.log(sortData(user.user.cvs, orderBy, order))
  // }, [user])

  return (
    <TableContainer component={'div'} sx={{ background: 'transparent' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar setSearchQuery={setSearchQuery} />
        {isCurrentUserProfile && (
          <Button color="secondary">
            <AddIcon /> Create CV
          </Button>
        )}
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple">
        <TableHeader
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headerCells}
        />
        <TableBody>
          {visibleRows &&
            visibleRows.map(row => (
              <CvItem key={row.id} name={row.name} description={row.description} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CvsTable
