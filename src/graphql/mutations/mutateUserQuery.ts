import { gql } from '@apollo/client'

export const UPDATE_USER_PROFILE = gql`
  mutation updateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
    }
  }
`
export const UPDATE_USER = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      department_name
      position_name
      role
    }
  }
`
