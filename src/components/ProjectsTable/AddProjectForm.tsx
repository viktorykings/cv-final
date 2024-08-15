import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField
} from '@mui/material'
import { IProject } from '../../shared/interfaces/IProject'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import CustomSelect from '../../shared/components/Select'
import { useGetProject } from '../../graphql/users/projects/hooks/useGetProject'
import DatePickerValue from './DatePicker'
import { useAddCvProject } from '../../graphql/cvs/hooks/useAddCvProject'
import { ICV } from '../../shared/interfaces/ICV'
import { useUpdateCvProject } from '../../graphql/cvs/hooks/useUpdateCvProject'

interface IAddProjectForm {
  cvId: string
  open: boolean
  cv: ICV
  handleClose: () => void
  allProjects: IProject[]
}

type TFormValues = {
  name: string
  internalName: string
  domain: string
  startDate: string
  endDate: string
  description: string
}
// TODO: fix date picker value format

const AddProjectForm = (props: IAddProjectForm) => {
  const { open, cv, cvId, allProjects, handleClose } = props

  const [userCvProjects, setUserCvProject] = useState<string[]>()

  const [selectedProjectName, setSelectedProjectName] = useState<string>('')
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const { data: project } = useGetProject(selectedProjectId)

  const { control, handleSubmit, watch, reset, formState } = useForm<TFormValues>({
    defaultValues: {
      name: '',
      internalName: '',
      domain: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  })
  const watchFields = watch(['name'])

  const getNAme = (arr: IProject[], str: string) => {
    const proj = arr.filter(el => el.name === str)
    return { name: proj[0].name, id: proj[0].id.toString() }
  }

  const [addCvProject] = useAddCvProject()
  const [updateCvProject] = useUpdateCvProject()

  useEffect(() => {
    if (cv.projects) {
      setUserCvProject(cv.projects.map(el => el.name))
    }
  }, [cv])

  useEffect(() => {
    if (allProjects && watchFields[0]) {
      setSelectedProjectName(getNAme(allProjects, watchFields[0]).name)
      setSelectedProjectId(getNAme(allProjects, watchFields[0]).id)
    }
  }, [allProjects, watchFields])

  useEffect(() => {
    if (project) {
      reset({
        name: project.project.name || '',
        internalName: project.project.internal_name || '',
        domain: project.project.domain || '',
        startDate: project.project.start_date || '',
        endDate: project.project.end_date || '',
        description: project.project.description || ''
      })
    }
  }, [project, reset])

  const onSubmit = (formData: TFormValues) => {
    if (selectedProjectId && cvId && userCvProjects) {
      if (userCvProjects && !userCvProjects.includes(selectedProjectName)) {
        addCvProject({
          variables: {
            project: {
              cvId: cvId,
              projectId: selectedProjectId,
              start_date: formData.startDate,
              end_date: formData.endDate ?? '',
              roles: [''],
              responsibilities: ['']
            }
          }
        })
      } else {
        updateCvProject({
          variables: {
            project: {
              cvId: cvId,
              projectId: selectedProjectId,
              start_date: formData.startDate,
              end_date: formData.endDate,
              roles: [''],
              responsibilities: ['']
            }
          }
        })
      }
    }
  }

  if (!allProjects) return <>no proj</>
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          handleClose()
        },
        sx: { maxWidth: '900px' }
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>Add Project</DialogContentText>

          {
            <Box sx={{ display: 'grid', gap: '32px', gridTemplateColumns: '1fr 1fr' }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CustomSelect {...field} label="Project" options={allProjects} />
                )}
              />
              <TextField
                name="internalName"
                label="Internal Name"
                value={formState.defaultValues?.internalName}
                disabled
                sx={{ boxSizing: 'border-box', margin: '16px 0 8px' }}
              />
              <TextField
                name="domain"
                label="Domain"
                value={formState.defaultValues?.domain}
                disabled
              />
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePickerValue {...field} label="Start Date" defaultValue={field.value} />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePickerValue {...field} label="End Date" defaultValue={field.value} />
                )}
              />
              <TextField
                name="description"
                label="Description"
                value={formState.defaultValues?.description}
                multiline
                maxRows={5}
                sx={{ gridColumn: 'span 2' }}
                disabled
              />
            </Box>
          }
        </DialogContent>
        <DialogActions>
          {/* <Button
                        variant="outlined"
                        onClick={() => handleDelete(defaultLang)}
                        sx={{ color: 'text.secondary' }}
                    >
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

export default AddProjectForm
