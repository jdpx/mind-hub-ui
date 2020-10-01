import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './NavigationLink.scss'

interface Props {
    text: string
    to?: string
    onClick?: () => void
    testID?: string
}

export default function NavigationLink({ text, to, onClick, testID }: Props) {
    return (
        <Nav.Item>
            <Link onClick={onClick} to={{ pathname: to }} data-testid={testID} className="nav-link">
                {text}
            </Link>
        </Nav.Item>
    )
}
