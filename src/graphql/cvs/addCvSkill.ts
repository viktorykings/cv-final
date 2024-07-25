import { gql } from '@apollo/client'

export const ADD_CV_SKILL = gql`
  mutation ADD_CV_SKILL($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
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
