import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import logo from '../../assets/home-welcome.svg'
import './Homepage.scss'

export default class Homepage extends Component {
    render() {
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
}
