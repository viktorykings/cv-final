import { useParams } from 'react-router-dom'
import ProjectsTable from '../../components/ProjectsTable'
import { CircularProgress } from '@mui/material'

const CvProjectsPage = () => {
  const { cvId } = useParams()
  if (!cvId)
    return (
      <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
    )

  return <ProjectsTable cvId={cvId} />
}
export default CvProjectsPage
