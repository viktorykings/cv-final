export type SidebarProps = {
  open: boolean
  toggleDrawer: (newOpen: boolean) => void
}

export type SidebarItemProps = {
  text: string
  handleLink: (path: string) => void
}
