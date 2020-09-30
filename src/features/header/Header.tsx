import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Nav, Navbar } from 'react-bootstrap'

import Logo from '../../components/logo/Logo'
import NavigationLink from './NavigationLink/NavigationLink'

import './Header.scss'

export default function Header() {
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
        <div className="header">
            <nav className="navbar navbar-expand">
                <Navbar.Brand href="/">
                    <Logo />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end w-100">
                        {isAuthenticated ? (
                            <>
                                <NavigationLink text="Dashboard" />
                                <NavigationLink text="Courses" />
                                <NavigationLink
                                    text="Logout"
                                    onClick={onLogoutClick}
                                    testID="logout-link"
                                />
                            </>
                        ) : (
                            <NavigationLink
                                text="Login"
                                onClick={onLoginClick}
                                testID="login-link"
                            />
                        )}
                    </Nav>
                </Navbar.Collapse>
            </nav>
        </div>
    )
}
