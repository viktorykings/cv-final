import { ReactNode, forwardRef } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent
} from '@mui/material'
import { IDepartment } from '../../../interfaces/IDepartment'
import { ISkill } from '../../../interfaces/ISkill'

interface CustomSelectProps {
  label: string
  value: string
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  options: IDepartment[] | ISkill[]
  error?: boolean
  helperText?: string
}

const ProfileSelect = forwardRef<HTMLDivElement, CustomSelectProps>(
  ({ label, value, onChange, options, error, helperText }, ref) => {
    return (
      <FormControl variant="outlined" margin="normal" error={error} sx={{ width: '410px' }}>
        <InputLabel>{label}</InputLabel>
        <Select ref={ref} value={value} onChange={onChange} label={label}>
          {options &&
            options.map(option => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    )
  }
)

export default ProfileSelect
