import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from '../../constants/constants.ts'
import { onError } from '@apollo/client/link/error'
import showToast from '../../utils/showToast.tsx'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_HTTP_LINK
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      if (message === 'Invalid credentials') {
        showToast('Wrong email or password')
      } else if (message.match('duplicate key value')) {
        showToast('User already exist')
      } else {
        showToast(message)
      }
    })
    if (networkError) showToast(networkError.toString())
  }
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache()
})
