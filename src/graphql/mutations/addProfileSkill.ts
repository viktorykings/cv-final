import { gql } from '@apollo/client'

export const ADD_PROFILE_SKILL = gql`
  mutation addProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      name
      category
      mastery
    }
  }
`
