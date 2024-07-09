import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query GET_USERS {
    users {
      id
      role
      department_name
      position_name
      email
      profile {
        first_name
        last_name
        full_name
        avatar
      }
      __typename
    }
  }
`
