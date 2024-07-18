import { useState } from 'react'
import { useGetProjects } from '../../graphql/users/projects/hooks/useGetProjects'
import CustomTable from '../../shared/components/Table'
import { useGetCv } from '../../graphql/cvs/hooks/useGetCv'
import { Box } from '@mui/material'
import SearchBar from '../../shared/components/Search'

interface IProjectTable {
  cvId?: string
  projectId?: string
}

const ProjectsTable = ({ cvId }: IProjectTable) => {
  const { data: projects } = useGetProjects()
  const { data: cv } = useGetCv(cvId as string)

  const [searchQuery, setSearchQuery] = useState('')
  const tableData = cv && cv.cv.projects ? cv.cv.projects : projects?.projects

  if (!tableData) return <>no data</>
  if (!projects) return <>no data</>
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar setSearchQuery={setSearchQuery} />
      </Box>
      <CustomTable
        headers={projects.projects.map(
          ({ name, internal_name, domain, team_size, start_date, end_date, id }) => ({
            name,
            internal_name,
            domain,
            team_size: team_size.toString(),
            start_date,
            end_date,
            id: id.toString()
          })
        )}
        data={tableData.map(
          ({ name, internal_name, domain, team_size, start_date, end_date, id }) => ({
            name,
            internal_name,
            domain,
            team_size: team_size.toString(),
            start_date,
            end_date,
            id: id.toString()
          })
        )}
        searchQuery={searchQuery}
      />
    </>
  )
}

export default ProjectsTable
