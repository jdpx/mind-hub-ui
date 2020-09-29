import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { Button, Nav } from 'react-bootstrap'

export default function LogoutButton() {
    const { logout } = useAuth0()

    return (
        <Nav.Link href="#link">Link</Nav.Link>
        // <Button
        //     onClick={() =>
        //         logout({
        //             returnTo: window.location.origin,
        //         })
        //     }
        //     variant="primary"
        //     className="btn-margin"
        //     data-testid="logout"
        // >
        //     Log Out
        // </Button>
    )
}
