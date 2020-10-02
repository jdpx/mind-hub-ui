import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import './NavigationLink.scss'

interface Props {
    text: string
    to?: string
    onClick?: () => void
    testid?: string
}

export default function NavigationLink({ text, to, onClick, testid }: Props) {
    return (
        <Nav.Item>
            <NavLink
                onClick={onClick}
                to={{ pathname: to }}
                data-testid={testid}
                activeClassName="active"
                className="nav-link"
            >
                {text}
            </NavLink>
        </Nav.Item>
    )
}
