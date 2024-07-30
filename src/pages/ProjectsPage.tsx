import { useState } from 'react'
import { useGetProjects } from '../graphql/projects/hooks/useGetProjects'
import SearchBar from '../shared/components/Search'
import { CircularProgress } from '@mui/material'
import CustomTable from '../shared/components/Table'

const ProjectsPage = () => {
  const { data: projects } = useGetProjects()
  const [searchQuery, setSearchQuery] = useState('')
  if (!projects)
    return (
      <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
    )
  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />

      <CustomTable
        data={projects.projects.map(
          ({ name, internal_name, domain, start_date, end_date, id }) => ({
            name,
            internal_name,
            domain,
            start_date,
            end_date: end_date ?? 'Till now',
            id: id.toString()
          })
        )}
        constextMenu={[]}
        searchQuery={searchQuery}
      />
    </>
  )
}
export default ProjectsPage
