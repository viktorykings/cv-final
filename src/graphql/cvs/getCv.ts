import { gql } from '@apollo/client'

export const GET_CV = gql`
  query GET_CV($id: ID!) {
    cv(cvId: $id) {
      id
      created_at
      name
      education
      description
      user {
        id
        email
        position_name
        profile {
          full_name
        }
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
      }
      skills {
        name
        category
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`
