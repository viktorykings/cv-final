import { TCvsTableHeaderProps } from '../interfaces/TSort'

export interface HeadCell {
  id: keyof TCvsTableHeaderProps
  label: string
}
