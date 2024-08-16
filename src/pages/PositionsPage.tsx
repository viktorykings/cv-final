import { useState } from 'react'
import { useGetPositions } from '../graphql/positions/hooks/useGetPositions'
import SearchBar from '../shared/components/Search'
import Table from '../shared/components/Table'
import { CircularProgress } from '@mui/material'

const PositionsPage = () => {
  const { data: positions } = useGetPositions()
  const [searchQuery, setSearchQuery] = useState('')
  if (!positions)
    return (
      <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
    )
  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Table
        data={positions.positions.map(({ name, id }) => ({
          name,

          id: id.toString()
        }))}
        constextMenu={[]}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  )
}
export default PositionsPage
