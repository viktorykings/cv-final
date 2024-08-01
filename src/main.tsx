import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import App from './App.tsx'
import { client } from './graphql/client.ts'
import { ThemeContextProvider } from './theme/themeContextProvider.tsx'
import { I18nextProvider } from 'react-i18next'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import i18n from './shared/utils/locales/i18n.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeContextProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ThemeContextProvider>
    </ApolloProvider>
  </React.StrictMode>
)
