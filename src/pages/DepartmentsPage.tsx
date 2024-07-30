import { useState } from 'react'
import { useGetDepartments } from '../graphql/departments/hooks/useGetDepartments'
import SearchBar from '../shared/components/Search'
import Table from '../shared/components/Table'
import { CircularProgress } from '@mui/material'

const DepartmentsPage = () => {
  const { data: departments } = useGetDepartments()
  const [searchQuery, setSearchQuery] = useState('')

  if (!departments)
    return (
      <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
    )
  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />

      <Table
        data={departments.departments.map(({ name, id }) => ({ name, id }))}
        constextMenu={[]}
        searchQuery={searchQuery}
      />
    </>
  )
}
export default DepartmentsPage
