import { Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { ISkillMastery, Mastery } from '../../../interfaces/ISkillMastery'
import { IUser } from '../../../interfaces/IUser'
import ProfileSelect from '../../Profile/Select/ProfileSelect'
import { useReactiveVar } from '@apollo/client'
import { userID } from '../../../constants/constants'

import { useEffect, useState } from 'react'
import CategoriesSelect from './CategoriesSelect'
import { useGetSkills } from '../../../graphql/skills/hooks/useGettAllSkills'
import { useAddProfileSkill } from '../../../graphql/users/skills/hooks/useAddProfileSkill'

type TFormProps = {
  open: boolean
  handleClose: () => void
  label: string
  user: IUser
  mastery: string[] | ISkillMastery[]
}

type TFormValues = {
  skill: string
  category: string
  mastery: Mastery
}

const SkillUpdForm = ({ open, handleClose, label, user, mastery }: TFormProps) => {
  const currentUserID = useReactiveVar(userID)
  const { control, handleSubmit, watch, setValue } = useForm<TFormValues>()
  const { data: skills } = useGetSkills()
  const [addSkill] = useAddProfileSkill()
  const [category, setCategory] = useState('')
  const watchFields = watch(['skill'])

  useEffect(() => {
    if (skills && !!watchFields[0]) {
      setCategory(() => skills.skills.filter(el => el.name === watchFields[0])[0].category || '')
      setValue('category', category)
    }
  }, [watchFields, category, setValue, skills])

  const onSubmit = (formData: TFormValues) => {
    console.log(formData)
    addSkill({
      variables: {
        skill: {
          userId: currentUserID,
          name: formData.skill,
          category: formData.category,
          mastery: formData.mastery
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
          {skills && user && (
            <>
              <Controller
                name="skill"
                control={control}
                defaultValue={user.profile.skills[0]?.toString() ?? ''}
                render={({ field }) => (
                  <ProfileSelect {...field} label="Skill" options={skills.skills} />
                )}
              />
              <Controller
                name="category"
                control={control}
                defaultValue={category}
                render={({ field }) => (
                  <CategoriesSelect
                    {...field}
                    label="Category"
                    options={[category]}
                    value={category}
                    isDisabled={true}
                  />
                )}
              />
              <Controller
                name="mastery"
                control={control}
                defaultValue={Mastery.Novice}
                render={({ field }) => (
                  <CategoriesSelect {...field} label="Skill mastery" options={mastery} />
                )}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
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

export default SkillUpdForm
