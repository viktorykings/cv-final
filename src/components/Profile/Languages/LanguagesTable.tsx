import { useGetUser } from '../../../graphql/users/hooks/useGetUser'
import { useReactiveVar } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { userID } from '../../../constants/constants'
import LanguageItem from './LanguageItem'
import { Proficiency } from '../../../interfaces/ILanguageProficiency'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import LanguageUpdateForm from './LanguageUpdateForm'

const LanguageLevels = [
  Proficiency.A1,
  Proficiency.A2,
  Proficiency.B1,
  Proficiency.B2,
  Proficiency.C1,
  Proficiency.C2,
  Proficiency.Native
]

const LanguagesTable = () => {
  const { id } = useParams()
  const { data: user } = useGetUser(id as string)
  const currentUserID = useReactiveVar(userID)
  const isCurrentUserProfile = currentUserID === user?.user.id
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setLanguage('')
    setOpen(false)
  }
  const handleOpenFormOnClickSkillItem = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const button = target.closest('button')
    if (button) {
      const span = button.querySelector('span') as HTMLElement
      if (span) {
        setLanguage(span.textContent ?? '')
        handleClickOpen()
      }
    }
  }
  return (
    <>
      <Button sx={{ color: 'text.secondary', margin: '0 auto' }} onClick={handleClickOpen}>
        <AddIcon /> Add language
      </Button>
      <div onClick={handleOpenFormOnClickSkillItem}>
        {user &&
          user.user.profile.languages.map(el => (
            <LanguageItem key={el.name} name={el.name} proficiency={el.proficiency} />
          ))}
      </div>
      {user && isCurrentUserProfile && (
        <LanguageUpdateForm
          open={open}
          handleClose={handleClose}
          label="Add language"
          user={user.user}
          proficiency={LanguageLevels}
          defaultLang={language}
        />
      )}
    </>
  )
}

export default LanguagesTable
