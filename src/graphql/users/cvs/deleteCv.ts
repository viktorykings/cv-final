import { gql } from '@apollo/client'

export const DELETE_PROFILE_CV = gql`
  mutation deleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`
