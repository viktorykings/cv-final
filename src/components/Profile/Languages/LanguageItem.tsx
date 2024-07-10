import { Button, Typography } from '@mui/material'
import { ILanguageProficiency } from '../../../interfaces/ILanguageProficiency'

const LanguageItem = ({ name, proficiency }: ILanguageProficiency) => {
  return (
    <Button
      sx={{
        width: '284px',
        textTransform: 'none',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 16px'
      }}
    >
      <Typography color="text.secondary">{proficiency}</Typography>
      <Typography color="text.secondary" component={'span'}>
        {name}
      </Typography>
    </Button>
  )
}

export default LanguageItem
