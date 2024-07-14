import { useReactiveVar } from '@apollo/client'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCreateCv } from '../../../graphql/users/cvs/hooks/useCreateCv'
import { userID } from '../../../shared/constants'
import { IUser } from '../../../shared/interfaces/IUser'

type TFormProps = {
  open: boolean
  handleClose: () => void
  label: string
  user: IUser
}
type TFormValues = {
  name: string
  education: string
  description: string
}

const CvForm = (props: TFormProps) => {
  const { open, label, handleClose } = props

  const currentUserID = useReactiveVar(userID)

  const { register, handleSubmit } = useForm<TFormValues>()

  const [createCv] = useCreateCv()
  // const [updateCv] = useUpdateCv()
  const onSubmit = (formData: TFormValues) => {
    console.log(formData)
    createCv({
      variables: {
        cv: {
          userId: currentUserID,
          name: formData.name,
          education: formData.education,
          description: formData.description
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
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            color="secondary"
            type="text"
            fullWidth
            InputLabelProps={{ style: { color: 'primary' } }}
            sx={{ margin: '32px 0' }}
            {...register('name')}
          />
          <TextField
            id="education"
            label="Education"
            variant="outlined"
            color="secondary"
            type="text"
            fullWidth
            InputLabelProps={{ style: { color: 'primary' } }}
            sx={{ marginBottom: '32px' }}
            {...register('education')}
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            color="secondary"
            type="text"
            fullWidth
            multiline
            rows={7}
            InputLabelProps={{ style: { color: 'primary' } }}
            {...register('description')}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            //   onClick={() => handleDelete(defaultLang)}
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

export default CvForm
