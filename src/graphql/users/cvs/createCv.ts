import { gql } from '@apollo/client'

export const CREATE_PROFILE_CV = gql`
  mutation createCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
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
