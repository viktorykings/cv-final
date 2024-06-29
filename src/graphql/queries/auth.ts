import { gql } from '@apollo/client'

export const LOGIN = gql`
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        email
      }
      access_token
    }
  }
`
export const SIGNUP = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
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
export const GET_USERS = gql`
  query GET_USERS {
    users {
      id
      role
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
