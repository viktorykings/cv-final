import { gql } from '@apollo/client'

export const DELETE_PROFILE_SKILL = gql`
  mutation deleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      name
    }
  }
`
