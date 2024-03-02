import App from '@/App'
import { ApolloProviderWithAuth0 } from '@/components/ApolloProviderWithAuth0'
import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={import.meta.env.VITE_DOMAIN}
        clientId={import.meta.env.VITE_CLIENT_ID}
        onRedirectCallback={(appState, user) => {
          console.log('appState:', appState)
          console.log('user:', user)
        }}
        authorizationParams={{
          audience: import.meta.env.VITE_AUDIENCE,
          redirect_uri: window.location.origin,
        }}
      >
        <ApolloProviderWithAuth0>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProviderWithAuth0>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
)
