import { useParams } from 'react-router-dom'
import { useGetUser } from '../../graphql/hooks/queries/useGetUser'
import { useGetSkillCategory } from '../../graphql/hooks/queries/getSkills'
import SkillCategory from '../../components/Skills/SkillCategory'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const ProfileSkills = () => {
  const { id } = useParams()
  const { data } = useGetUser(id as string)
  const { data: skills } = useGetSkillCategory()
  return (
    <Box
      sx={{
        padding: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'center',
        maxWidth: '900px',
        width: '100%',
        gap: 4
      }}
    >
      <Button sx={{ color: 'text.secondary', margin: '0 auto' }}>
        <AddIcon /> Add skill
      </Button>
      {skills &&
        data &&
        skills.skillCategories
          .filter(el => data.user.profile.skills.map(el => el.category).includes(el))
          .map(el => <SkillCategory key={el} skills={data.user.profile.skills} category={el} />)}
    </Box>
  )
}

export default ProfileSkills
