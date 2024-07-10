import { gql } from '@apollo/client'

export const ADD_PROFILE_LANGUAGE = gql`
  mutation addProfileLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
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
