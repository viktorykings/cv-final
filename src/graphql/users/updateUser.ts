import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      department_name
      position_name
      role
    }
  }
`
