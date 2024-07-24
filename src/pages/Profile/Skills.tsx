import { useParams } from 'react-router-dom'
import SkillsTable from '../../shared/components/SkillsTable/index.tsx'
import { useGetUser } from '../../graphql/users/hooks/useGetUser.tsx'

const ProfileSkills = () => {
  const { id } = useParams()
  const { data: user } = useGetUser(id as string)
  if (!user) return <>no user data</>

  return (
    <SkillsTable userId={user.user.id} skills={user.user.profile.skills} isProfileSkills={true} />
  )
}

export default ProfileSkills
