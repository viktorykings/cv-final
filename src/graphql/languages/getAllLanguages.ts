import { gql } from '@apollo/client'

export const GET_LANGUAGES = gql`
  query {
    languages {
      id
      created_at
      iso2
      name
      native_name
    }
  }
`
