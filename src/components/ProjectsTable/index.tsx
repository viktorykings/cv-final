import { useState } from 'react'
import { useGetProjects } from '../../graphql/users/projects/hooks/useGetProjects'
import CustomTable from '../../shared/components/Table'
import { useGetCv } from '../../graphql/cvs/hooks/useGetCv'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import SearchBar from '../../shared/components/Search'
import { useReactiveVar } from '@apollo/client'
import { userID } from '../../shared/constants'
import AddIcon from '@mui/icons-material/Add'
import AddProjectForm from './AddProjectForm'
import { useGetUser } from '../../graphql/users/hooks/useGetUser'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface IProjectTable {
  cvId?: string
  projectId?: string
}

const ProjectsTable = ({ cvId }: IProjectTable) => {
  const { data: projects } = useGetProjects()
  const { data: cv } = useGetCv(cvId as string)
  const currentUserID = useReactiveVar(userID)
  const { data: user } = useGetUser(currentUserID)
  const isCurrentUserCv = cv && cv.cv.user && currentUserID === cv.cv.user.id
  const [searchQuery, setSearchQuery] = useState('')
  const tableData = cv && cv.cv.projects ? cv.cv.projects : projects?.projects
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  if (!projects || !cv)
    return (
      <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
    )
  if (!tableData || !tableData.length || !projects.projects.length)
    return (
      <Typography sx={{ display: 'flex', justifyContent: 'center' }} color={'text.secondary'}>
        {t('projects.noProjects')}
      </Typography>
    )
  if (!cv.cv.user)
    return (
      <>
        <Typography color={'text.secondary'}>{t('projects.error')}</Typography>{' '}
        <Button color="secondary" variant="outlined" onClick={() => navigate('/users')}>
          {t('projects.goToMain')}
        </Button>
      </>
    )
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
      {isCurrentUserCv && cvId && cv && user && (
        <AddProjectForm
          open={open}
          cvId={cvId}
          handleClose={handleClose}
          cv={cv.cv}
          allProjects={projects.projects}
        />
      )}
    </>
  )
}

export default ProjectsTable
