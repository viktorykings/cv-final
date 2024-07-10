import { gql } from '@apollo/client'

export const UPDATE_PROFILE_CV = gql`
  mutation updateCv($cv: UpdateCvInput!) {
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
