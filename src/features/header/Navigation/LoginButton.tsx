import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { Button, Nav } from 'react-bootstrap'

export default function LoginButton() {
    const { loginWithRedirect } = useAuth0()

    return (
        <Nav.Link href="#link">Link</Nav.Link>

        // <Button
        //     onClick={() => loginWithRedirect()}
        //     variant="primary"
        //     className="btn-margin"
        //     data-testid="login"
        // >
        //     Log In
        // </Button>
    )
}
