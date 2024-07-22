import { TablePropsTT } from '../components/Table/TableHeader'

function customFilter(arr: TablePropsTT[], searchQuery: string) {
  return arr.filter(el => {
    return (
      el.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.internal_name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })
}

export default customFilter
