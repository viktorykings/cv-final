import { Box, Typography } from '@mui/material'
import { ISkillMastery, SkillLevel } from '../../interfaces/ISkillMastery'
import SkillUpdButton from './SkillUpdButton'

type TSkillsCategory = {
  skills: ISkillMastery[]
  category: string
}
interface SkillLevels {
  Novice: number
  Advanced: number
  Competent: number
  Proficient: number
  Expert: number
}

const skillLevels: SkillLevels = {
  Novice: 20,
  Advanced: 40,
  Competent: 60,
  Proficient: 80,
  Expert: 100
}

function getSkillLevel(level: SkillLevel): number {
  return skillLevels[level]
}

const SkillCategory = ({ skills, category }: TSkillsCategory) => {
  return (
    <Box>
      <Typography> {category}</Typography>
      {skills &&
        skills
          .filter(el => el.category === category)
          .map(el => (
            <SkillUpdButton key={el.name} skill={el.name} progress={getSkillLevel(el.mastery)} />
          ))}
    </Box>
  )
}

export default SkillCategory
