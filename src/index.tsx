import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

import './index.scss'
import App from './App'
import { store } from './app/store'
import * as serviceWorker from './serviceWorker'

import Auth0ProviderWithHistory from './providers/AuthenticationProvider'
import AuthorizedApolloProvider from './providers/AuthorizedApolloProvider'
import * as Sentry from './helpers/sentry'

import './styles/fonts/KGSmallTownSouthernGirl.ttf'

Sentry.init()

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Auth0ProviderWithHistory>
                <AuthorizedApolloProvider>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </AuthorizedApolloProvider>
            </Auth0ProviderWithHistory>
        </Router>
    </React.StrictMode>,
    document.getElementById('root'),
)

serviceWorker.unregister()
