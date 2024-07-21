import { gql } from '@apollo/client'

export const ADD_CV_PROJECT = gql`
  mutation ADD_CV_PROJECT($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      id
      created_at
      name
      education
      description
      user {
        id
        email
      }
      projects {
        id
        name
        internal_name
        description
        domain
        start_date
        end_date
        team_size
        roles
        responsibilities
      }
    }
  }
`
