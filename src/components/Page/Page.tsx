import React from 'react'
import { Container } from 'react-bootstrap'

import './Page.scss'

interface Props {
    children: React.ReactNode
}

export default function Page({ children }: Props) {
    return (
        <Container>
            <div className="page">{children}</div>
        </Container>
    )
}
