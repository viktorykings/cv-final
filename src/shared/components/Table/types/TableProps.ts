export type TProps = Record<string, string | null | undefined>
export type ComparatorProps = {
  [key in keyof TProps]: string | null | undefined
}
export interface IContextMenuItem {
  label: string
  path?: string
  onClick?: () => void
}
