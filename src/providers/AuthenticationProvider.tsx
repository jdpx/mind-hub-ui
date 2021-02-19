import React from 'react'
import { useHistory } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { AppState } from '@auth0/auth0-react/dist/auth0-provider'

interface Props {
    children: React.ReactNode
}

const scopes = ['read:organisation:1ohTDUgTsyvWet5lJFCCqnA2F1S']

const Auth0ProviderWithHistory = ({ children }: Props) => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN || ''
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || ''

    const history = useHistory()

    const onRedirectCallback = (appState: AppState) => {
        history.push(appState?.returnTo || window.location.pathname)
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            scope={scopes.join(' ')}
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithHistory
