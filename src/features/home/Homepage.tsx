import React from 'react'

import { useAuth0 } from '@auth0/auth0-react'
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import logo from '../../assets/home-welcome.svg'
import './Homepage.scss'

export default function Homepage() {
    const { isAuthenticated } = useAuth0()

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="home-page" data-testid="home-page">
            <Container>
                <div className="d-flex flex-column justify-content-center">
                    <h1>Welcome to Mind E-Learning</h1>
                    <img src={logo} alt="Mind In Salford Logo" />
                </div>
            </Container>
        </div>
    )
}
