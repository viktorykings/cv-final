import { gql } from '@apollo/client'

export const GET_CVS = gql`
  query GET_CVS {
    cvs {
      id
      created_at
      name
      education
      description
      user {
        email
      }
    }
  }
`
