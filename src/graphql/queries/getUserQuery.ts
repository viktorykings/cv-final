import { gql } from '@apollo/client'

export const GET_USER = gql`
  query GET_USER($id: ID!) {
    user(userId: $id) {
      id
      created_at
      email
      is_verified
      profile {
        id
        created_at
        first_name
        last_name
        full_name
        avatar
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
      cvs {
        id
        created_at
        name
        education
        description
        user {
          id
        }
        projects {
          id
          name
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
      department {
        id
        created_at
        name
      }
      department_name
      position {
        id
        created_at
        name
      }
      position_name
      role
    }
  }
`
