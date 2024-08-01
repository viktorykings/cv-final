import { Box, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import { useTranslation } from 'react-i18next'

enum Languages {
  EN = 'en',
  RU = 'ru'
}

const languages = {
  [Languages.EN]: 'English',
  [Languages.RU]: 'Русский'
}

const LanguageSwitch = () => {
  const { i18n } = useTranslation()
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const handleChangeLang = (event: SelectChangeEvent) => {
    changeLanguage(event.target.value)
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LanguageIcon sx={{ fill: '#767676' }} />
      <FormControl variant="standard" sx={{ padding: '16.5px 34px 16.5px 10px' }}>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={i18n.language}
          label="language"
          onChange={handleChangeLang}
          color="secondary"
          disableUnderline
        >
          <MenuItem value={Languages.EN} defaultChecked>
            {languages[Languages.EN]}
          </MenuItem>
          <MenuItem value={Languages.RU}>{languages[Languages.RU]}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default LanguageSwitch
