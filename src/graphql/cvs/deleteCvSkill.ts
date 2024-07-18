import { gql } from '@apollo/client'

export const DELETE_CV_SKILL = gql`
  query DELETE_CV_SKILL($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
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
