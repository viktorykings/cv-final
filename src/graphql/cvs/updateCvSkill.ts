import { gql } from '@apollo/client'

export const UPDATE_CV_SKILL = gql`
  query UPDATE_CV_SKILL($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
      created_at
      name
      education
      description
      user {
        id
        email
      }

      skills {
        name
        category
        mastery
      }
    }
  }
`
