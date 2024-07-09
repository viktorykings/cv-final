import { useParams } from 'react-router-dom'
import { useGetUser } from '../../graphql/users/hooks/useGetUser'
import { useGetSkillCategory } from '../../graphql/skills/hooks/useGetSkillsCategories'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { useGetSkills } from '../../graphql/skills/hooks/useGettAllSkills'
import SkillsTableRow from '../../components/Profile/Skills/SkillsTableRow.tsx'
import SkillUpdForm from '../../components/Profile/Skills/SkillUpdForm'
import { useReactiveVar } from '@apollo/client'
import { userID } from '../../constants/constants.ts'

const ProfileSkills = () => {
  const { id } = useParams()
  const { data: user } = useGetUser(id as string)
  const { data: categories } = useGetSkillCategory()
  const { data: skills } = useGetSkills()
  const [open, setOpen] = useState(false)
  const [defaultSkill, setDefaultSkill] = useState('')
  const currentUserID = useReactiveVar(userID)
  const isCurrentUserProfile = currentUserID === user?.user.id

  const masteries: string[] = ['Novice', 'Advanced', 'Competent', 'Proficient', 'Expert']
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setDefaultSkill('')
    setOpen(false)
  }

  const handleOpenFormOnClickSkillItem = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const button = target.closest('button')
    if (button) {
      setDefaultSkill(button.textContent ?? '')
      handleClickOpen()
    }
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
      <div onClick={handleOpenFormOnClickSkillItem}>
        {user &&
          skills &&
          categories &&
          categories.skillCategories
            .filter(category => user.user.profile.skills.map(el => el.category).includes(category))
            .map(el => (
              <SkillsTableRow key={el} skills={user.user.profile.skills} category={el || 'Other'} />
            ))}
        {user &&
          user.user.profile.skills
            .filter(el => el.category === '')
            .map(el => (
              <SkillsTableRow
                key={el.name}
                skills={user.user.profile.skills.filter(el => el.category === '')}
                category={''}
              />
            ))}
      </div>
      {user && isCurrentUserProfile && (
        <SkillUpdForm
          open={open}
          handleClose={handleClose}
          label="add skill"
          user={user.user}
          mastery={masteries}
          defaultSkill={defaultSkill}
        />
      )}
    </Box>
  )
}

export default ProfileSkills
