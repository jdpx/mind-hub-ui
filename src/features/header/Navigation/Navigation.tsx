import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Nav, Navbar } from 'react-bootstrap'

import NavigationLink from './NavigationLink'
import Logo from '../../../components/logo/Logo'

export default function Navigation() {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

    const onLoginClick = () => {
        loginWithRedirect()
    }

    const onLogoutClick = () => {
        logout({
            returnTo: window.location.origin,
        })
    }

    return (
        <nav className="navbar navbar-expand">
            <Navbar.Brand href="/">
                <Logo />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end w-100" activeKey="/home">
                    {isAuthenticated ? (
                        <>
                            <NavigationLink text="Courses" />
                            <NavigationLink text="Logout" onClick={onLogoutClick} />
                        </>
                    ) : (
                        <NavigationLink text="Login" onClick={onLoginClick} />
                    )}
                </Nav>
            </Navbar.Collapse>
        </nav>
    )
}
