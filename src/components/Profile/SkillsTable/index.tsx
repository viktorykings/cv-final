import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useGetSkillCategory } from '../../../graphql/skills/hooks/useGetSkillsCategories'
import { useGetSkills } from '../../../graphql/skills/hooks/useGettAllSkills'
import { userID } from '../../../shared/constants'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SkillsTableRow from './SkillsTableRow'
import SkillUpdForm from './SkillUpdForm'
import { ISkillMastery } from '../../../shared/interfaces/ISkillMastery'
import { IUser } from '../../../shared/interfaces/IUser'

interface ISkillTableProps {
  user?: IUser
  skills: ISkillMastery[]
}

const SkillsTable = ({ user, skills }: ISkillTableProps) => {
  const { data: categories } = useGetSkillCategory()
  const { data: allSkills } = useGetSkills()
  const [open, setOpen] = useState(false)
  const [defaultSkill, setDefaultSkill] = useState('')
  const currentUserID = useReactiveVar(userID)
  const isCurrentUserProfile = currentUserID === user?.id

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
        {skills &&
          allSkills &&
          categories &&
          categories.skillCategories
            .filter(category => skills.map(el => el.category).includes(category))
            .map(el => <SkillsTableRow key={el} skills={skills} category={el || 'Other'} />)}
        {skills &&
          skills
            .filter(el => el.category === '')
            .map(el => (
              <SkillsTableRow
                key={el.name}
                skills={skills.filter(el => el.category === '')}
                category={''}
              />
            ))}
      </div>
      {user && isCurrentUserProfile && (
        <SkillUpdForm
          open={open}
          handleClose={handleClose}
          label="Add skill"
          user={user}
          mastery={masteries}
          defaultSkill={defaultSkill}
        />
      )}
    </Box>
  )
}

export default SkillsTable
