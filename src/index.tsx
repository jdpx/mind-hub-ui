import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

import './index.scss'
import App from './App'
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
                    <App />
                </AuthorizedApolloProvider>
            </Auth0ProviderWithHistory>
        </Router>
    </React.StrictMode>,
    document.getElementById('root'),
)

serviceWorker.unregister()
