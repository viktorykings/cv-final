import { gql } from '@apollo/client'

export const GET_SKILLS = gql`
  query {
    skills {
      id
      created_at
      name
      category
    }
  }
`
