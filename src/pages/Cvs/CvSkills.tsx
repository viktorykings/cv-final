import { useParams } from 'react-router-dom'
import { useGetCv } from '../../graphql/cvs/hooks/useGetCv'
import SkillsTable from '../../shared/components/SkillsTable'
import { CircularProgress } from '@mui/material'

const CvSkillsPage = () => {
  const { cvId } = useParams()
  const { data: cv } = useGetCv(cvId as string)
  if (!cv)
    return (
      <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
    )

  return <SkillsTable userId={cv.cv.user.id} cvId={cv.cv.id} skills={cv.cv.skills} />
}
export default CvSkillsPage
