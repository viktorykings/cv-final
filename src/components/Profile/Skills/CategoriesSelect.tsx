import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { forwardRef, ReactNode } from 'react'
import { ISkillMastery } from '../../../interfaces/ISkillMastery'

type TCategories = {
  options: string[] | ISkillMastery[]
  label: string
  value: string
  error?: boolean
  isDisabled?: boolean
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}

const StringSelect = forwardRef<HTMLDivElement, TCategories>(
  ({ label, value, options, error, onChange, isDisabled }, ref) => {
    return (
      <FormControl variant="outlined" margin="normal" error={error} sx={{ width: '410px' }}>
        <InputLabel>{label}</InputLabel>
        <Select ref={ref} value={value} label={label} onChange={onChange} disabled={isDisabled}>
          {options.map(el => (
            <MenuItem key={el.toString()} value={el.toString()}>
              {el.toString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
)

export default StringSelect
