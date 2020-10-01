import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.scss'
import App from './App'
import { store } from './app/store'
import * as serviceWorker from './serviceWorker'

import Auth0ProviderWithHistory from './features/authentication/AuthenticationProvider'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/fonts/KGSmallTownSouthernGirl.ttf'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Auth0ProviderWithHistory>
                <Provider store={store}>
                    <App />
                </Provider>
            </Auth0ProviderWithHistory>
        </Router>
    </React.StrictMode>,
    document.getElementById('root'),
)

serviceWorker.unregister()
