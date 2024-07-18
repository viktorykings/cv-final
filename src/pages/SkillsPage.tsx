import { useParams } from 'react-router-dom'
import SkillsTable from '../components/Profile/SkillsTable'
import { useGetCv } from '../graphql/cvs/hooks/useGetCv'

const SkillsPage = () => {
  const { cvId } = useParams()
  const { data: cv } = useGetCv(cvId as string)
  if (!cv) return <>no cv</>

  return <SkillsTable skills={cv.cv.skills} />
}
export default SkillsPage
