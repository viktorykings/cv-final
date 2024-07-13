import { Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { ISkillMastery, Mastery } from '../../../shared/interfaces/ISkillMastery'
import { IUser } from '../../../shared/interfaces/IUser'
import CustomSelect from '../../../shared/components/Select'
import { useReactiveVar } from '@apollo/client'
import { userID } from '../../../shared/constants'
import { useEffect, useState } from 'react'
import { useGetSkills } from '../../../graphql/skills/hooks/useGettAllSkills'
import { useAddProfileSkill } from '../../../graphql/users/skills/hooks/useAddProfileSkill'
import { useUpdateProfileSkill } from '../../../graphql/users/skills/hooks/useUpdateProfileSkill'
// import { useDeleteProfileSkill } from '../../../graphql/users/skills/hooks/useDeleteProfileSkill'

type TFormProps = {
  open: boolean
  handleClose: () => void
  label: string
  user: IUser
  mastery: string[] | ISkillMastery[]
  defaultSkill: string
}

type TFormValues = {
  skill: string
  category: string
  mastery: Mastery
}

const SkillUpdForm = ({ open, handleClose, label, user, mastery, defaultSkill }: TFormProps) => {
  const currentUserID = useReactiveVar(userID)
  const { control, handleSubmit, watch, setValue } = useForm<TFormValues>({
    defaultValues: {
      skill: defaultSkill,
      category: '',
      mastery: Mastery.Novice
    }
  })
  const { data: skills } = useGetSkills()
  const [addSkill] = useAddProfileSkill()
  const [updateSkill] = useUpdateProfileSkill()
  // const [deleteSkill] = useDeleteProfileSkill()
  const [category, setCategory] = useState('')
  const watchFields = watch(['skill'])
  const [userSkills, setUserSkills] = useState<ISkillMastery[]>()

  useEffect(() => {
    if (user) {
      setUserSkills(user.profile.skills)
    }
    if (skills && !!watchFields[0]) {
      setCategory(() => skills.skills.filter(el => el.name === watchFields[0])[0].category || '')
      setValue('category', category)
    }
  }, [watchFields, category, setValue, skills, user])
  useEffect(() => {
    if (defaultSkill) {
      setValue('skill', defaultSkill)
    } else setValue('skill', '')
  }, [defaultSkill, setValue])

  const onSubmit = (formData: TFormValues) => {
    if (userSkills) {
      if (userSkills.map(el => el.name).includes(formData.skill)) {
        updateSkill({
          variables: {
            skill: {
              userId: currentUserID,
              name: formData.skill,
              mastery: formData.mastery
            }
          }
        })
      } else {
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
    }
  }

  // const handleDelete = () => {
  //   deleteSkill({
  //     variables: {
  //       skill: {
  //         userId: currentUserID,
  //         name: ['MobX']
  //       }
  //     }
  //   })
  // }

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
                render={({ field }) => (
                  <CustomSelect {...field} label="Skill" options={skills.skills} />
                )}
              />
              <Controller
                name="category"
                control={control}
                defaultValue={category}
                render={({ field }) => (
                  <CustomSelect
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
                  <CustomSelect {...field} label="Skill mastery" options={mastery} />
                )}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {/* <Button variant="outlined" onClick={handleDelete} sx={{ color: 'text.secondary' }}>
            Delete
          </Button> */}
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
