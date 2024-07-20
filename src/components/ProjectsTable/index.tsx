import { useState } from 'react'
import { useGetProjects } from '../../graphql/users/projects/hooks/useGetProjects'
import CustomTable from '../../shared/components/Table'
import { useGetCv } from '../../graphql/cvs/hooks/useGetCv'
import { Box, Button } from '@mui/material'
import SearchBar from '../../shared/components/Search'
import { useReactiveVar } from '@apollo/client'
import { userID } from '../../shared/constants'
import AddIcon from '@mui/icons-material/Add'
import AddProjectForm from './AddProjectForm'

interface IProjectTable {
  cvId?: string
  projectId?: string
}

const ProjectsTable = ({ cvId }: IProjectTable) => {
  const { data: projects } = useGetProjects()
  const { data: cv } = useGetCv(cvId as string)
  const currentUserID = useReactiveVar(userID)
  const isCurrentUserCv = currentUserID === cv?.cv.user.id
  const [searchQuery, setSearchQuery] = useState('')
  const tableData = cv && cv.cv.projects ? cv.cv.projects : projects?.projects

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  if (!tableData) return <>no data</>
  if (!projects) return <>no data</>
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar setSearchQuery={setSearchQuery} />
        {isCurrentUserCv && (
          <Button color="secondary" onClick={handleClickOpen}>
            <AddIcon /> Create CV
          </Button>
        )}
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
      {isCurrentUserCv && (
        <AddProjectForm
          open={open}
          handleClose={handleClose}
          // project={projects.projects}
        />
      )}
    </>
  )
}

export default ProjectsTable
