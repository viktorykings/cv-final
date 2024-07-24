import { gql } from '@apollo/client'

export const UPLOAD_USER_AVATAR = gql`
  mutation uploadAvatar($avatar: UploadAvatarInput!) {
    scalar
  }
`
