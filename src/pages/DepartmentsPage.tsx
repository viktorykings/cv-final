import { useState } from 'react'
import { useGetDepartments } from '../graphql/departments/hooks/useGetDepartments'
import SearchBar from '../shared/components/Search'
import Table from '../shared/components/Table'

const DepartmentsPage = () => {
  const { data: departments } = useGetDepartments()
  const [searchQuery, setSearchQuery] = useState('')

  if (!departments) return <>no dep</>
  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />

      <Table
        data={departments.departments.map(({ name, id }) => ({ name, id }))}
        constextMenu={[]}
        searchQueryProp={searchQuery}
      />
    </>
  )
}
export default DepartmentsPage
