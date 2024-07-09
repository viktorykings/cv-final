import { gql } from '@apollo/client'

export const GET_POSITIONS = gql`
  query {
    positions {
      id
      created_at
      name
    }
  }
`
