import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { ISkillMastery, SkillLevel } from '../../../shared/interfaces/ISkillMastery'
import SkillItem from './SkillItem'

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

const SkillsTable = ({ skills, category }: TSkillsCategory) => {
  const [, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <Box>
      <Typography> {category ? category : 'Other'}</Typography>
      {skills &&
        skills
          .filter(el => el.category === category)
          .map(el => (
            <SkillItem
              key={el.name}
              skill={el.name}
              progress={getSkillLevel(el.mastery)}
              handleClickOpen={handleClickOpen}
            />
          ))}
    </Box>
  )
}

export default SkillsTable
