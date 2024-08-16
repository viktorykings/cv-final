import * as React from 'react'
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
import dayjs from 'dayjs'

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

const AddProjectForm = (props: IAddProjectForm) => {
  const { open, cv, cvId, allProjects, handleClose } = props

  const [userCvProjects, setUserCvProject] = useState<string[]>()
  const [selectedProjectName, setSelectedProjectName] = useState<string>('')
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const { data: project } = useGetProject(selectedProjectId)

  const { control, handleSubmit, watch, reset } = useForm<TFormValues>({
    defaultValues: {
      name: '',
      internalName: '',
      domain: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  })

  const watchName = watch('name')

  const getProjectDetails = (projects: IProject[], name: string) => {
    return projects.find(el => el.name === name)
  }

  const [addCvProject] = useAddCvProject()
  const [updateCvProject] = useUpdateCvProject()

  useEffect(() => {
    if (cv.projects) {
      setUserCvProject(cv.projects.map(el => el.name))
    }
  }, [cv])

  useEffect(() => {
    if (allProjects && watchName) {
      const projectDetails = getProjectDetails(allProjects, watchName)
      if (projectDetails) {
        setSelectedProjectName(projectDetails.name)
        setSelectedProjectId(projectDetails.id.toString())
      }
    }
  }, [allProjects, watchName])

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
              end_date: formData.endDate,
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
          <Box sx={{ display: 'grid', gap: '32px', gridTemplateColumns: '1fr 1fr' }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <CustomSelect {...field} label="Project" options={allProjects} />
              )}
            />
            <Controller
              name="internalName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Internal Name"
                  value={field.value || ''}
                  sx={{ boxSizing: 'border-box', margin: '16px 0 8px' }}
                  disabled
                />
              )}
            />
            <Controller
              name="domain"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Domain"
                  value={field.value || ''}
                  sx={{ boxSizing: 'border-box', margin: '16px 0 8px' }}
                  disabled
                />
              )}
            />
            <Controller
              name="startDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePickerValue
                  label="Start Date"
                  value={value ? dayjs(value) : null}
                  onChange={newValue => onChange(newValue ? newValue.format('YYYY-MM-DD') : '')}
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePickerValue
                  label="End Date"
                  value={value ? dayjs(value) : null}
                  onChange={newValue => onChange(newValue ? newValue.format('YYYY-MM-DD') : '')}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  maxRows={5}
                  sx={{ gridColumn: 'span 2' }}
                  value={field.value || ''}
                  disabled
                />
              )}
            />
          </Box>
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

export default AddProjectForm
