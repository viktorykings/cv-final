import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from '../shared/constants/index.ts'
import { onError } from '@apollo/client/link/error'
import showToast from '../shared/utils/showToast.tsx'
import { logOut } from '../shared/utils/logOut.ts'

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

  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          logOut()
          break
        default:
          break
      }
    }
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
