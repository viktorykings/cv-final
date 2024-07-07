import { Button, LinearProgress, Typography } from '@mui/material'
type SkillBtn = {
  skill: string
  progress: number
  handleClickOpen: () => void
}

const SkillUpdButton = ({ skill, progress, handleClickOpen }: SkillBtn) => {
  return (
    <Button sx={{ width: '284px', textTransform: 'none', gap: 2 }} onClick={handleClickOpen}>
      <LinearProgress
        variant="determinate"
        value={progress}
        color="secondary"
        sx={{ minWidth: '80px' }}
      />
      <Typography key={skill} component={'h6'} sx={{ color: 'text.secondary' }}>
        {skill}
      </Typography>
    </Button>
  )
}

export default SkillUpdButton
