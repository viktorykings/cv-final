import { gql } from '@apollo/client'

export const GET_PROJECT = gql`
  query GET_PROJECT($id: ID!) {
    project(projectId: $id) {
      id
      created_at
      name
      internal_name
      description
      domain
      start_date
      end_date
      team_size
      tech_stack {
        id
        created_at
        name
        category
      }
    }
  }
`
