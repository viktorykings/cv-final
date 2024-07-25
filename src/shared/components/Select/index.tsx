import { ReactNode, forwardRef } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent
} from '@mui/material'
import { IDepartment } from '../../interfaces/IDepartment'
import { ISkill } from '../../interfaces/ISkill'
import { ISkillMastery } from '../../interfaces/ISkillMastery'
import hasId from '../../../components/utils/optionHasId'
import { IProject } from '../../interfaces/IProject'
import { useTranslation } from 'react-i18next'

interface CustomSelectProps {
  label: string
  value: string
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  options: IDepartment[] | ISkill[] | string[] | ISkillMastery[] | IProject[]
  error?: boolean
  helperText?: string
  isDisabled?: boolean
}

const CustomSelect = forwardRef<HTMLDivElement, CustomSelectProps>(
  ({ label, value, onChange, options, error, helperText, isDisabled }, ref) => {
    const { t } = useTranslation()
    return (
      <FormControl variant="outlined" margin="normal" error={error} sx={{ width: '410px' }}>
        <InputLabel>{label}</InputLabel>
        <Select ref={ref} value={value} onChange={onChange} label={label} disabled={isDisabled}>
          {options &&
            options.map((option, i) => (
              <MenuItem
                key={hasId(option) ? option.id : i}
                value={typeof option === 'string' ? option : option.name}
              >
                {/* {typeof option === 'string' ? option : option.name} */}
                {typeof option === 'string'
                  ? t(`skills.masteries.${option.toLowerCase()}`, option)
                  : option.name}
              </MenuItem>
            ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    )
  }
)

export default CustomSelect
