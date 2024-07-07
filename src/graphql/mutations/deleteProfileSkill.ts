import { gql } from '@apollo/client'

export const DELETE_PROFILE_SKILL = gql`
  mutation deleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        category
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`
