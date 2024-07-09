import { useParams } from 'react-router-dom'
import { useGetUser } from '../../graphql/users/hooks/useGetUser'
import { useGetSkillCategory } from '../../graphql/skills/hooks/useGetSkillsCategories'
import SkillCategory from '../../components/Skills/SkillsCategoryRow'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SkillUpdForm from '../../components/Skills/SkillUpdForm'
import { useState } from 'react'
import { useGetSkills } from '../../graphql/skills/hooks/useGettAllSkills'

const ProfileSkills = () => {
  const { id } = useParams()
  const { data } = useGetUser(id as string)
  const { data: categories } = useGetSkillCategory()
  const { data: skills } = useGetSkills()
  const [open, setOpen] = useState(false)

  const masteries: string[] = ['Novice', 'Advanced', 'Competent', 'Proficient', 'Expert']
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
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
      <Button sx={{ color: 'text.secondary', margin: '0 auto' }} onClick={handleClickOpen}>
        <AddIcon /> Add skill
      </Button>
      {data &&
        skills &&
        categories &&
        categories.skillCategories
          .filter(category => data.user.profile.skills.map(el => el.category).includes(category))
          .map(el => (
            <SkillCategory key={el} skills={data.user.profile.skills} category={el || 'Other'} />
          ))}
      {data && (
        <SkillUpdForm
          open={open}
          handleClose={handleClose}
          label="add skill"
          user={data.user}
          mastery={masteries}
        />
      )}
    </Box>
  )
}

export default ProfileSkills
