import { gql } from '@apollo/client'

export const DELETE_CV_PROJECT = gql`
  mutation DELETE_CV_PROJECT($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
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
