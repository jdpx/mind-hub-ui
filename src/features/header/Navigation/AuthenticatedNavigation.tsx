import React from 'react'
import LogoutButton from './LogoutButton'

export default function AuthenticatedNavigation() {
    return (
        <div data-testid="authenticated-navigation">
            Authenticated
            <LogoutButton />
        </div>
    )
}
