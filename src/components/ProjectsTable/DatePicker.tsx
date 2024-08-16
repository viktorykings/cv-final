import * as React from 'react'
import { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

interface IDatePicker {
  label: string
  value: Dayjs | null
  onChange: (value: Dayjs | null) => void
}

const DatePickerValue = React.forwardRef<HTMLDivElement, IDatePicker>(
  ({ label, value, onChange }, ref) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          ref={ref}
          label={label}
          value={value}
          onChange={onChange}
          slotProps={{
            textField: {
              variant: 'outlined',
              fullWidth: true,
              size: 'small'
            }
          }}
        />
      </LocalizationProvider>
    )
  }
)

export default DatePickerValue
