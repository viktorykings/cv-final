import { Controller, useForm } from 'react-hook-form'
import { ILanguageProficiency, Proficiency } from '../../../shared/interfaces/ILanguageProficiency'
import { IUser } from '../../../shared/interfaces/IUser'
import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useGetLanguages } from '../../../graphql/languages/hooks/useGetAllLanguages'
import { useReactiveVar } from '@apollo/client'
import { userID } from '../../../shared/constants'
import { useAddProfileLang } from '../../../graphql/users/languages/hooks/useAddProfileLang'
import { useDeleteProfileLang } from '../../../graphql/users/languages/hooks/useDeleteProfileLang'
import CustomSelect from '../../../shared/components/Select'
import { useUpdateProfileLang } from '../../../graphql/users/languages/hooks/UseUpdateProfileLang'

type TFormProps = {
  open: boolean
  handleClose: () => void
  label: string
  user: IUser
  proficiency: Proficiency[]
  defaultLang: string
}
type TFormValues = {
  language: string
  proficiency: Proficiency
}
const LanguageUpdateForm = (props: TFormProps) => {
  const currentUserID = useReactiveVar(userID)
  const { open, label, user, proficiency, defaultLang, handleClose } = props
  const { control, handleSubmit, setValue } = useForm<TFormValues>({
    defaultValues: {
      language: defaultLang ?? '',
      proficiency: Proficiency.A1
    }
  })

  const { data: languages } = useGetLanguages()
  const [addLanguage] = useAddProfileLang()
  const [updateLanguage] = useUpdateProfileLang()
  const [deleteLanguage] = useDeleteProfileLang()
  const [userLanguages, setUserLanguages] = useState<ILanguageProficiency[]>()
  useEffect(() => {
    if (user) setUserLanguages(user.profile.languages)
    if (defaultLang) {
      setValue('language', defaultLang)
    } else setValue('language', '')
  }, [userLanguages, defaultLang, setValue, user])

  const onSubmit = (formData: TFormValues) => {
    if (userLanguages) {
      if (userLanguages.map(el => el.name).includes(formData.language)) {
        updateLanguage({
          variables: {
            language: {
              userId: currentUserID,
              name: formData.language,
              proficiency: formData.proficiency
            }
          }
        })
      } else {
        addLanguage({
          variables: {
            language: {
              userId: currentUserID,
              name: formData.language,
              proficiency: formData.proficiency
            }
          }
        })
      }
    }
  }
  const handleDelete = (str: string) => {
    deleteLanguage({
      variables: {
        language: {
          userId: currentUserID,
          name: [str]
        }
      }
    })
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          handleClose()
        }
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>{label}</DialogContentText>
          {languages && user && (
            <>
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    label="Language"
                    options={languages.languages.map(el => el.name)}
                  />
                )}
              />
              <Controller
                name="proficiency"
                control={control}
                render={({ field }) => (
                  <CustomSelect {...field} label="Language proficiency" options={proficiency} />
                )}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => handleDelete(defaultLang)}
            sx={{ color: 'text.secondary' }}
          >
            Delete
          </Button>
          <Button variant="outlined" onClick={handleClose} sx={{ color: 'text.secondary' }}>
            Cancel
          </Button>
          <Button type="submit" color="secondary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default LanguageUpdateForm
