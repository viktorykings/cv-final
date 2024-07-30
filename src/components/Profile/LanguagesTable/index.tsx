import { useGetUser } from '../../../graphql/users/hooks/useGetUser'
import { useReactiveVar } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { userID } from '../../../shared/constants'
import LanguageItem from './LanguageItem'
import { Proficiency } from '../../../shared/interfaces/ILanguageProficiency'
import { Button, CircularProgress, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import LanguageUpdateForm from './LanguageUpdateForm'
import { useTranslation } from 'react-i18next'

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
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState('')
  const { t } = useTranslation()

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
  if (!user)
    return (
      <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
    )
  const isCurrentUserProfile = currentUserID === user.user.id

  return (
    <>
      {isCurrentUserProfile && (
        <Button sx={{ color: 'text.secondary', margin: '0 auto' }} onClick={handleClickOpen}>
          <AddIcon /> {t('buttons.addLanguage')}
        </Button>
      )}
      <div onClick={handleOpenFormOnClickSkillItem}>
        {!user.user.profile.languages.length && (
          <Typography sx={{ display: 'flex', justifyContent: 'center' }} color={'text.secondary'}>
            {t('languages.noLanguages')}
          </Typography>
        )}
        {user.user.profile.languages.map(el => (
          <LanguageItem
            key={el.name}
            name={el.name}
            proficiency={el.proficiency}
            id={''}
            native_name={''}
            iso2={''}
          />
        ))}
      </div>
      {isCurrentUserProfile && (
        <LanguageUpdateForm
          open={open}
          handleClose={handleClose}
          label={t('buttons.addLanguage')}
          user={user.user}
          proficiency={LanguageLevels}
          defaultLang={language}
        />
      )}
    </>
  )
}

export default LanguagesTable
