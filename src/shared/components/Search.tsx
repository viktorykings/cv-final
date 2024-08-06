import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'

type SearchBarProps = {
  setSearchQuery: (value: string) => void
}

const SearchBar = ({ setSearchQuery }: SearchBarProps) => {
  const { t } = useTranslation()

  const handleSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery((e.target as HTMLInputElement).value)
  }
  return (
    <div style={{ margin: ' 20px 0 0 ' }}>
      <TextField
        id="search-bar"
        className="text"
        onChange={e => handleSearch(e)}
        variant="outlined"
        color="secondary"
        placeholder={t('buttons.search')}
        size="small"
        sx={{ width: '320px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      ></TextField>
    </div>
  )
}
export default SearchBar
