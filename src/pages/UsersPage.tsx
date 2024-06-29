import UsersTable from '../components/Users/UsersTable'
import { useGetUsers } from '../hooks/getData'

const UsersPage = () => {
  const { data } = useGetUsers()
  return <UsersTable users={data?.users} />
}

export default UsersPage
