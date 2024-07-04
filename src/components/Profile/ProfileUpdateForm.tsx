import { Box, Button, TextField } from '@mui/material'
import ProfileSelect from './Select/ProfileSelect'
import { useGetPositions } from '../../hooks/useGetPositions'
import { useGetDepartments } from '../../hooks/useGetDepartments'
import { IUser } from '../../interfaces/IUser'
import { useForm, Controller } from 'react-hook-form'
import { useUpdateUser, useUpdateUserProfile } from '../../hooks/useMutateUser'
import { useReactiveVar } from '@apollo/client'
import { userID } from '../../constants/constants'
import { IDepartment } from '../../interfaces/IDepartment'

type FormValues = {
  firstName: string
  lastName: string
  position: string
  department: string
}
const ProfileUpdateForm = ({ data }: { data: IUser }) => {
  const currentUserID = useReactiveVar(userID)
  const { control, handleSubmit } = useForm<FormValues>()
  const { data: positions } = useGetPositions()
  const { data: departments } = useGetDepartments()
  const [updateProfile] = useUpdateUserProfile()
  const [updateUser] = useUpdateUser()

  const getId = (arr: IDepartment[] | undefined, str: string) => {
    if (!arr) return
    const res = arr.filter(el => el.name === str)[0]
    return res.id
  }

  const onSubmit = (formData: FormValues) => {
    console.log(formData)
    updateProfile({
      variables: {
        profile: {
          userId: data.id,
          first_name: formData.firstName,
          last_name: formData.lastName
        }
      }
    })
    updateUser({
      variables: {
        user: {
          userId: data.id,
          positionId: getId(positions && positions.positions, formData.position),
          departmentId: getId(departments && departments.departments, formData.department)
        }
      }
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'grid', gap: '32px', gridTemplateColumns: '1fr 1fr' }}>
        <Controller
          name="firstName"
          control={control}
          defaultValue={data.profile.first_name || ''}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              variant="outlined"
              margin="normal"
              color="secondary"
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue={data.profile.last_name || ''}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              variant="outlined"
              margin="normal"
              color="secondary"
            />
          )}
        />
        {departments && (
          <Controller
            name="department"
            control={control}
            defaultValue={data.department_name || ''}
            render={({ field }) => (
              <ProfileSelect {...field} label="Department" options={departments.departments} />
            )}
          />
        )}
        {positions && (
          <Controller
            name="position"
            control={control}
            defaultValue={data.position_name || ''}
            render={({ field }) => (
              <ProfileSelect {...field} label="Position" options={positions.positions} />
            )}
          />
        )}
        {currentUserID === data.id && (
          <Button type="submit" variant="contained" color="secondary">
            update
          </Button>
        )}
      </Box>
    </form>
  )
}

export default ProfileUpdateForm
