import { TableCell, TableRow } from '@mui/material'

type TCvItemProps = {
  name: string
  description: string
}
const CvItem = (props: TCvItemProps) => {
  const { name, description } = props
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left" sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        {name}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '855px',
          textOverflow: 'ellipsis'
        }}
      >
        {description}
      </TableCell>
      <TableCell align="left" scope="col" sx={{ width: '20px' }}>
        details
      </TableCell>
    </TableRow>
  )
}

export default CvItem
