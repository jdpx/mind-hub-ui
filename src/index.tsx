import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.scss'
import App from './App'
import { store } from './app/store'
import * as serviceWorker from './serviceWorker'

import Auth0ProviderWithHistory from './features/authentication/AuthenticationProvider'

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
