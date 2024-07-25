import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

type SearchBarProps = {
  setSearchQuery: (value: string) => void
}

const SearchBar = ({ setSearchQuery }: SearchBarProps) => {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()

  useEffect(() => {
    const filterParam = searchParams.get('filter')
    if (filterParam) {
      setSearchQuery(filterParam)
    }
  }, [searchParams, setSearchQuery])
  return (
    <div style={{ margin: ' 20px 0 0 ' }}>
      <TextField
        id="search-bar"
        className="text"
        onInput={e => {
          setSearchQuery((e.target as HTMLInputElement).value)
        }}
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
