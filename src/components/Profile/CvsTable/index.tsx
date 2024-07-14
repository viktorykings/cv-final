import { TableContainer, Table, TableBody, Button, Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import SearchBar from '../../../shared/components/Search'
import { useEffect, useMemo, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useGetUser } from '../../../graphql/users/hooks/useGetUser'
import { userID } from '../../../shared/constants'
import CvItem from './CvItem'
import AddIcon from '@mui/icons-material/Add'
import customFilter from '../../../shared/utils/customFilter'
import TableHeader from '../../../shared/components/TableHeader'
import customSort from '../../../shared/utils/customSort'
import { SortOrder } from '../../../shared/interfaces/TSortOrder'
import { TCvsTableHeaderProps } from '../../../shared/interfaces/TSort'
import { HeadCell } from '../../../shared/components/THeadCells'
import CvForm from './CvForm'
import { ICV } from '../../../shared/interfaces/ICV'

const headerCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'description',
    label: 'Description'
  },
  {
    id: 'id',
    label: ''
  }
]

const CvsTable = () => {
  const { id } = useParams()
  const { data: user } = useGetUser(id as string)
  const currentUserID = useReactiveVar(userID)
  const isCurrentUserProfile = currentUserID === user?.user.id

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [cvs, setCvs] = useState<ICV[]>()
  const [order, setOrder] = useState<SortOrder>('asc')
  const [orderBy, setOrderBy] = useState<keyof TCvsTableHeaderProps>('name')

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TCvsTableHeaderProps
  ) => {
    event.preventDefault()
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const filtered = customFilter(cvs && cvs, searchQuery)
  const visibleRows = useMemo(
    () => filtered && customSort(filtered, order, orderBy),
    [order, orderBy, filtered]
  )

  useEffect(() => {
    if (user && user.user.cvs) setCvs(user.user.cvs)
    console.log(cvs)
  }, [user?.user.cvs, cvs, user])
  // TODO fix refetch cvs after create/delete
  return (
    <>
      <TableContainer component={'div'} sx={{ background: 'transparent' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SearchBar setSearchQuery={setSearchQuery} />
          {isCurrentUserProfile && (
            <Button color="secondary" onClick={handleClickOpen}>
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
                <CvItem key={row.id} id={row.id} name={row.name} description={row.description} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {user && isCurrentUserProfile && (
        <CvForm open={open} handleClose={handleClose} label="Add CV" user={user.user} />
      )}
    </>
  )
}

export default CvsTable
