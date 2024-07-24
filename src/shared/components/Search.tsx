import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

type SearchBarProps = {
  setSearchQuery: (value: string) => void
}

const SearchBar = ({ setSearchQuery }: SearchBarProps) => (
  <div style={{ margin: ' 20px 0 0 ' }}>
    <TextField
      id="search-bar"
      className="text"
      onInput={e => {
        setSearchQuery((e.target as HTMLInputElement).value)
      }}
      variant="outlined"
      color="secondary"
      placeholder="Search"
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
export default SearchBar
