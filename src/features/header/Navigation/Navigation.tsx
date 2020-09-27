import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Nav } from 'react-bootstrap'

import UnauthenticatedNavigation from './UnauthenticatedNavigation'
import AuthenticatedNavigation from './AuthenticatedNavigation'

export default function Navigation() {
    const foo = useAuth0()

    return (
        <Nav className="justify-content-end">
            {foo.isAuthenticated ? <AuthenticatedNavigation /> : <UnauthenticatedNavigation />}
        </Nav>
    )
}
