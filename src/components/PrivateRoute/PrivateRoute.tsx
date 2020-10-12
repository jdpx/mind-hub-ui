/* eslint-disable react/display-name */
import React from 'react'
import { Route, RouteProps } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../Loading/Loading'

type Props = RouteProps & {
    component: React.ComponentType
}

const PrivateRoute = ({ component, ...args }: Props) => (
    <Route
        component={withAuthenticationRequired(component, {
            onRedirecting: () => <Loading testid="loading" />,
        })}
        {...args}
    />
)

export default PrivateRoute
