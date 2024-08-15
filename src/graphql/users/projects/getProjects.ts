import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  query GET_PROJECTS {
    projects {
      id
      created_at
      name
      internal_name
      description
      domain
      start_date
      end_date
      environment
    }
  }
`
