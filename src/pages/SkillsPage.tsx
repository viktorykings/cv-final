import { useParams } from 'react-router-dom'
import SkillsTable from '../shared/components/SkillsTable'
import { useGetCv } from '../graphql/cvs/hooks/useGetCv'

const SkillsPage = () => {
  const { cvId } = useParams()
  const { data: cv } = useGetCv(cvId as string)
  if (!cv) return <>no cv</>

  return <SkillsTable userId={cv.cv.user.id} cvId={cv.cv.id} skills={cv.cv.skills} />
}
export default SkillsPage
