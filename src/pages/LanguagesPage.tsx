import { useState } from 'react'
import SearchBar from '../shared/components/Search'
import Table from '../shared/components/Table'
import { useGetLanguages } from '../graphql/languages/hooks/useGetAllLanguages'

const LanguagesPage = () => {
  const { data: languages } = useGetLanguages()
  const [searchQuery, setSearchQuery] = useState('')
  if (!languages) return <>no languages</>
  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />

      <Table
        data={languages.languages.map(({ name, native_name, iso2, id }) => ({
          name,
          native_name,
          iso2,
          id
        }))}
        constextMenu={[]}
        searchQuery={searchQuery}
      />
    </>
  )
}
export default LanguagesPage
