import { gql } from '@apollo/client'

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(auth: { email: $email, password: $password }) {
      user {
        id
        email
        role
      }
      access_token
    }
  }
`

export const GET_CVS = gql`
  query {
    cvs {
      languages {
        proficiency
      }
    }
  }
`

export const GET_TODOS = gql`
  query {
    characters {
      info {
        count
      }
      results {
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`
