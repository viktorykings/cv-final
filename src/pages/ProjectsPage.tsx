import { useState } from 'react'
import { useGetProjects } from '../graphql/projects/hooks/useGetProjects'
import SearchBar from '../shared/components/Search'
import Table from '../shared/components/Table'

const ProjectsPage = () => {
  const { data: projects } = useGetProjects()
  const [searchQuery, setSearchQuery] = useState('')
  if (!projects) return <>no projects</>
  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />

      <Table
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
