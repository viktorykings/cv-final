import { useParams } from 'react-router-dom'
import SkillsTable from '../../components/Profile/SkillsTable/index.tsx'
import { useGetUser } from '../../graphql/users/hooks/useGetUser.tsx'

const ProfileSkills = () => {
  const { id } = useParams()
  const { data: user } = useGetUser(id as string)
  if (!user) return <>no user data</>

  return <SkillsTable user={user.user} skills={user.user.profile.skills} />
}

export default ProfileSkills
