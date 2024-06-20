import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import theme from './styles/theme.tsx'
import { CssBaseline } from '@mui/material'
import { AUTH_TOKEN } from './constants/constants.ts'
import './index.css'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_HTTP_LINK
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN)
  // return the headers to be used in the HTTP request
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
)
