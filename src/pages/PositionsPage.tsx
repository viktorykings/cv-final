import { useState } from 'react'
import { useGetPositions } from '../graphql/positions/hooks/useGetPositions'
import SearchBar from '../shared/components/Search'
import Table from '../shared/components/Table'

const PositionsPage = () => {
  const { data: positions } = useGetPositions()
  const [searchQuery, setSearchQuery] = useState('')
  if (!positions) return <>no positions</>
  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />

      <Table
        data={positions.positions.map(({ name, id }) => ({
          name,

          id: id.toString()
        }))}
        constextMenu={[]}
        searchQuery={searchQuery}
      />
    </>
  )
}
export default PositionsPage
