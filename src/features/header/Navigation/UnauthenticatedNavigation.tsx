import React from 'react'
import LoginButton from './LoginButton'

export default function UnauthenticatedNavigation() {
    return (
        <div data-testid="unauthenticated-navigation">
            Unauthenticated
            <LoginButton />
        </div>
    )
}
