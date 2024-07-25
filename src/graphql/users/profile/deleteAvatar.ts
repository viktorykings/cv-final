import { gql } from '@apollo/client'

export const DELETE_USER_AVATAR = gql`
  mutation deleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`
