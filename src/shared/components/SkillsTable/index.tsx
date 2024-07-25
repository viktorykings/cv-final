import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useGetSkillCategory } from '../../../graphql/skills/hooks/useGetSkillsCategories'
import { useGetSkills } from '../../../graphql/skills/hooks/useGettAllSkills'
import { userID } from '../../constants'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SkillsTableRow from './SkillsTableRow'
import SkillUpdForm from './SkillUpdForm'
import { useTranslation } from 'react-i18next'
import { ISkillMastery } from '../../interfaces/ISkillMastery'

interface ISkillTableProps {
  userId: string
  cvId?: string
  skills: ISkillMastery[]
  isProfileSkills?: boolean
}

const SkillsTable = ({ skills, userId, cvId, isProfileSkills }: ISkillTableProps) => {
  const { data: categories } = useGetSkillCategory()
  const { data: allSkills } = useGetSkills()
  const [open, setOpen] = useState(false)
  const [defaultSkill, setDefaultSkill] = useState('')
  const currentUserID = useReactiveVar(userID)
  const { t } = useTranslation()
  const isCurrentUserProfile = currentUserID === userId

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
  const skillsToRender = skills
    .slice()
    .map(el => (el.category === '' ? { ...el, category: 'Other' } : el))
  const categoriesToRedner = categories && [...categories.skillCategories, 'Other']

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
        <AddIcon /> {t('buttons.addSkill')}
      </Button>
      <div onClick={handleOpenFormOnClickSkillItem}>
        {skillsToRender &&
          allSkills &&
          categoriesToRedner &&
          categoriesToRedner
            .filter(category => skillsToRender.map(el => el.category).includes(category))
            .map(el => <SkillsTableRow key={el} skills={skillsToRender} category={el} />)}
      </div>
      {isCurrentUserProfile && (
        <SkillUpdForm
          open={open}
          handleClose={handleClose}
          label={t('buttons.addSkill')}
          userId={userId}
          cvId={cvId}
          mastery={masteries}
          defaultSkill={defaultSkill}
          skills={skills}
          isProfileSkills={isProfileSkills}
        />
      )}
    </Box>
  )
}

export default SkillsTable
