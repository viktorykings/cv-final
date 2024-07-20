import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

interface IDatePicker {
  label: string
  defaultValue: string
}

const DatePickerValue = React.forwardRef<HTMLDivElement, IDatePicker>(
  ({ label, defaultValue }: IDatePicker, ref) => {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(defaultValue))

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          ref={ref}
          label={label}
          value={value}
          onChange={newValue => setValue(newValue)}
          sx={{
            '.MuiPickersDay-root': {
              // color: 'red',
              borderColor: 'red',
              backgroundColor: 'red'
            }
          }}
        />
      </LocalizationProvider>
    )
  }
)
export default DatePickerValue
