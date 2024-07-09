import UsersTable from '../components/Users/UsersTable'
import { useGetUsers } from '../graphql/hooks/queries/getData'

const UsersPage = () => {
  const { data } = useGetUsers()
  return <UsersTable users={data?.users} />
}

export default UsersPage
