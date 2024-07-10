import { gql } from '@apollo/client'

export const DELETE_PROFILE_CV = gql`
  mutation updateCv($cv: DeleteCvInput!) {
    updateCv(cv: $cv) {
      id
      created_at
      name
      education
      description
      user {
        id
      }
    }
  }
`
