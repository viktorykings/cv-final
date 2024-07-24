import { gql } from '@apollo/client'

export const UPDATE_CV_PROJECT = gql`
  mutation UPDATE_CV_PROJECT($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
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
