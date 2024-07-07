import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { forwardRef } from 'react'
import { ISkillMastery } from '../../interfaces/ISkillMastery'

type TCategories = {
  options: string[] | ISkillMastery[]
  label: string
  value: string
  error?: boolean
  isDisabled?: boolean
}

const StringSelect = forwardRef<HTMLDivElement, TCategories>(
  ({ label, value, options, error, isDisabled }, ref) => {
    return (
      <FormControl variant="outlined" margin="normal" error={error} sx={{ width: '410px' }}>
        <InputLabel>{label}</InputLabel>
        <Select ref={ref} value={value} label={label} disabled={isDisabled}>
          <MenuItem value={options[0].toString()}>{options[0].toString()}</MenuItem>
        </Select>
      </FormControl>
    )
  }
)

export default StringSelect
