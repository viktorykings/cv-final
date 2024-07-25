import { useParams } from 'react-router-dom'
import { useGetCv } from '../../graphql/cvs/hooks/useGetCv'
import SkillsTable from '../../shared/components/SkillsTable'

const CvSkillsPage = () => {
  const { cvId } = useParams()
  const { data: cv } = useGetCv(cvId as string)
  if (!cv) return <>no cv</>

  return <SkillsTable userId={cv.cv.user.id} cvId={cv.cv.id} skills={cv.cv.skills} />
}
export default CvSkillsPage
