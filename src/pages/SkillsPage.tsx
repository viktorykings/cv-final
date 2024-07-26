import { useState } from 'react'
import SearchBar from '../shared/components/Search'
import Table from '../shared/components/Table'
import { useGetSkills } from '../graphql/skills/hooks/useGettAllSkills'
import { CircularProgress } from '@mui/material'
const SkillsPage = () => {
  const { data: skills } = useGetSkills()
  const [searchQuery, setSearchQuery] = useState('')
  if (!skills)
    return (
      <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
    )

  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />

      <Table
        data={skills.skills.map(({ name, category, id }) => ({
          name,
          category: category ?? '',
          id: id.toString()
        }))}
        constextMenu={[]}
        searchQuery={searchQuery}
      />
    </>
  )
}
export default SkillsPage
