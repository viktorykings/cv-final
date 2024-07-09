import UsersTable from '../components/Users/UsersTable'
import { useGetAllUsers } from '../graphql/users/hooks/useGetAllUsers'

const UsersPage = () => {
  const { data } = useGetAllUsers()
  return <UsersTable users={data?.users} />
}

export default UsersPage
