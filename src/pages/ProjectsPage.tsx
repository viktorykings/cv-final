import { useParams } from 'react-router-dom'
import ProjectsTable from '../components/ProjectsTable'

const ProjectsPage = () => {
  const { cvId } = useParams()
  if (!cvId) return <>no single cv</>

  return <ProjectsTable cvId={cvId} />
}
export default ProjectsPage
