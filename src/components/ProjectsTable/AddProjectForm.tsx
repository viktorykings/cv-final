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
import { useGetProjects } from '../../graphql/users/projects/hooks/useGetProjects'
import { useEffect, useState } from 'react'
import CustomSelect from '../../shared/components/Select'
import { useGetProject } from '../../graphql/users/projects/hooks/useGetProject'

interface IAddProjectForm {
  open: boolean
  handleClose: () => void
}

type TFormValues = {
  name: string
  internalName: string
  domain: string
  teamSize: string
  startDate: string
  endDate: string
  description: string
}

const AddProjectForm = (props: IAddProjectForm) => {
  const { open, handleClose } = props
  const { data: projects } = useGetProjects()

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const { data: project } = useGetProject(selectedProjectId)

  const { control, handleSubmit, watch, reset, formState } = useForm<TFormValues>({
    defaultValues: {
      name: '',
      internalName: '',
      domain: '',
      teamSize: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  })
  const watchFields = watch(['name'])

  const getId = (arr: IProject[], str: string): string => {
    const project = arr.find(el => el.name === str)
    return project ? project.id.toString() : ''
  }

  useEffect(() => {
    if (projects && watchFields[0]) {
      const id = getId(projects.projects, watchFields[0])
      setSelectedProjectId(id)
    }
  }, [projects, watchFields])

  useEffect(() => {
    if (project) {
      reset({
        name: project.project.name || '',
        internalName: project.project.internal_name || '',
        domain: project.project.domain || '',
        teamSize: project.project.team_size.toString() || '',
        startDate: project.project.start_date || '',
        endDate: project.project.end_date || '',
        description: project.project.description || ''
      })
    }
  }, [project, reset])

  const onSubmit = (formData: TFormValues) => {
    console.log(formData)
  }

  if (!projects) return <>no proj</>
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
                  <CustomSelect {...field} label="Project" options={projects.projects} />
                )}
              />
              <TextField
                name="internalName"
                label="Internal Name"
                value={formState.defaultValues?.internalName}
                disabled
              />
              <TextField
                name="domain"
                label="Domain"
                value={formState.defaultValues?.domain}
                disabled
              />
              <TextField
                name="teamSize"
                label="Team Size"
                value={formState.defaultValues?.teamSize}
                disabled
              />
              <TextField
                name="startDate"
                label="Start Date"
                value={formState.defaultValues?.startDate}
                disabled
              />
              <TextField
                name="endDate"
                label="End Date"
                value={formState.defaultValues?.endDate}
                disabled
              />

              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <CustomSelect {...field} label="Start Date" options={[field.value]} />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <CustomSelect {...field} label="End Date" options={[field.value]} />
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
