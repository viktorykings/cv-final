import { Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { ISkillMastery, Mastery } from '../../interfaces/ISkillMastery'
import CustomSelect from '../Select'
import { useReactiveVar } from '@apollo/client'
import { userID } from '../../constants'
import { useEffect, useState } from 'react'
import { useGetSkills } from '../../../graphql/skills/hooks/useGettAllSkills'
import { useAddProfileSkill } from '../../../graphql/users/skills/hooks/useAddProfileSkill'
import { useUpdateProfileSkill } from '../../../graphql/users/skills/hooks/useUpdateProfileSkill'
import { useAddCvSkill } from '../../../graphql/cvs/hooks/useAddCvSkill'
import { useUpdateCvSkill } from '../../../graphql/cvs/hooks/useUpdateCvSkill'
import { useTranslation } from 'react-i18next'
import { useDeleteProfileSkill } from '../../../graphql/users/skills/hooks/useDeleteProfileSkill'
import { useDeleteCvSkill } from '../../../graphql/cvs/hooks/useDeleteCvSkill'

type TFormProps = {
  open: boolean
  handleClose: () => void
  label: string
  userId?: string
  cvId?: string
  mastery: string[] | ISkillMastery[]
  defaultSkill: string
  skills?: ISkillMastery[]
  isProfileSkills?: boolean
}

type TFormValues = {
  skill: string
  category: string
  mastery: Mastery
}

const SkillUpdForm = ({
  open,
  handleClose,
  label,
  mastery,
  defaultSkill,
  skills,
  cvId,
  isProfileSkills
}: TFormProps) => {
  const currentUserID = useReactiveVar(userID)
  const { control, handleSubmit, watch, setValue } = useForm<TFormValues>({
    defaultValues: {
      skill: defaultSkill,
      category: '',
      mastery: Mastery.Novice
    }
  })
  const { data: allSkills } = useGetSkills()
  const [addSkill] = useAddProfileSkill()
  const [updateSkill] = useUpdateProfileSkill()
  const [deleteSkill] = useDeleteProfileSkill()
  const [addCvSkill] = useAddCvSkill()
  const [updateCvSkill] = useUpdateCvSkill()
  const [deleteCvSkill] = useDeleteCvSkill()
  const [category, setCategory] = useState('')
  const watchFields = watch(['skill'])
  const [userSkills, setUserSkills] = useState<ISkillMastery[]>()

  const { t } = useTranslation()
  useEffect(() => {
    if (skills) setUserSkills(skills)

    if (allSkills && !!watchFields[0]) {
      setCategory(() => allSkills.skills.filter(el => el.name === watchFields[0])[0].category || '')
      setValue('category', category)
    }
  }, [watchFields, category, setValue, allSkills, skills])
  useEffect(() => {
    if (defaultSkill) {
      setValue('skill', defaultSkill)
    } else setValue('skill', '')
  }, [defaultSkill, setValue])

  const onSubmit = (formData: TFormValues) => {
    if (userSkills) {
      if (isProfileSkills) {
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
      } else if (cvId) {
        if (userSkills.map(el => el.name).includes(formData.skill)) {
          updateCvSkill({
            variables: {
              skill: {
                cvId: cvId,
                name: formData.skill,
                mastery: formData.mastery
              }
            }
          })
        } else {
          addCvSkill({
            variables: {
              skill: {
                cvId: cvId,
                name: formData.skill,
                category: formData.category,
                mastery: formData.mastery
              }
            }
          })
        }
      }
    }
  }

  const handleDelete = (skill: string) => {
    if (isProfileSkills) {
      deleteSkill({
        variables: {
          skill: {
            userId: currentUserID,
            name: [skill]
          }
        }
      })
    } else {
      deleteCvSkill({
        variables: {
          skill: {
            cvId: cvId ?? '',
            name: [skill]
          }
        }
      })
    }

    handleClose()
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
          {allSkills && (
            <>
              <Controller
                name="skill"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    label={t('skills.skill')}
                    options={allSkills.skills}
                    isDisabled={!!defaultSkill}
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                defaultValue={category}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    label={t('tableHeadLabels.category')}
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
                  <CustomSelect {...field} label={t('skills.skillMastery')} options={mastery} />
                )}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => handleDelete(defaultSkill)}
            sx={{ color: 'text.secondary' }}
          >
            {t('buttons.delete')}
          </Button>
          <Button variant="outlined" onClick={handleClose} sx={{ color: 'text.secondary' }}>
            {t('buttons.cancel')}
          </Button>
          <Button type="submit" color="secondary" variant="contained">
            {t('buttons.update')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SkillUpdForm
