import { TextField, Button } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useUpdateCv } from '../../graphql/users/cvs/hooks/useUpdateCv'
import { useParams } from 'react-router-dom'
import { useGetCv } from '../../graphql/cvs/hooks/useGetCv'
import { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { userID } from '../../shared/constants'
type TFormValues = {
  name: string
  education: string
  description: string
}

const CVDetails = () => {
  const currentUserID = useReactiveVar(userID)

  const { cvId } = useParams()
  const { data: cv } = useGetCv(cvId as string)
  const [user, setUser] = useState('')

  const isCurrentUserCv = user === currentUserID

  const { handleSubmit, reset, control } = useForm<TFormValues>({
    defaultValues: {
      name: '',
      education: '',
      description: ''
    }
  })

  useEffect(() => {
    if (cv) {
      setUser(cv.cv.user.id)
      reset({
        name: cv.cv.name,
        education: cv.cv.education,
        description: cv.cv.description
      })
    }
  }, [cv, reset])
  const [updateCv] = useUpdateCv()
  const onSubmit = (formData: TFormValues) => {
    if (cvId && isCurrentUserCv) {
      updateCv({
        variables: {
          cv: {
            cvId: cvId,
            name: formData.name,
            education: formData.education,
            description: formData.description
          }
        }
      })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue={cv?.cv.name || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            variant="outlined"
            margin="normal"
            color="secondary"
            type="text"
            fullWidth
            sx={{ margin: '32px 0' }}
          />
        )}
      />
      <Controller
        name="education"
        control={control}
        defaultValue={cv?.cv.education || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label="Education"
            variant="outlined"
            margin="normal"
            color="secondary"
            type="text"
            fullWidth
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue={cv?.cv.description || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            margin="normal"
            color="secondary"
            type="text"
            fullWidth
            multiline
            rows={7}
            sx={{ marginBottom: '32px' }}
          />
        )}
      />

      {isCurrentUserCv && (
        <Button type="submit" color="secondary" variant="contained" fullWidth>
          Update
        </Button>
      )}
    </form>
  )
}

export default CVDetails
