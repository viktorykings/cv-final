import { gql } from '@apollo/client'

export const UPDATE_PROFILE_SKILL = gql`
  mutation updateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      name
      category
      mastery
    }
  }
`
