import { useParams } from 'react-router-dom'
import SkillsTable from '../../shared/components/SkillsTable/index.tsx'
import { useGetUser } from '../../graphql/users/hooks/useGetUser.tsx'
import { CircularProgress } from '@mui/material'

const ProfileSkills = () => {
  const { id } = useParams()
  const { data: user } = useGetUser(id as string)
  if (!user)
    return (
      <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
    )

  return (
    <SkillsTable userId={user.user.id} skills={user.user.profile.skills} isProfileSkills={true} />
  )
}

export default ProfileSkills
