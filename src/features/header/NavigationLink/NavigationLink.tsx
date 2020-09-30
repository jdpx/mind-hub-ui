import React from 'react'
import { Nav } from 'react-bootstrap'

import './NavigationLink.scss'

interface Props {
    text: string
    href?: string
    onClick?: () => void
    testID?: string
}

export default function NavigationLink({ text, href, onClick, testID }: Props) {
    return (
        <Nav.Item>
            <Nav.Link onClick={onClick} href={href} data-testid={testID}>
                {text}
            </Nav.Link>
        </Nav.Item>
    )
}
