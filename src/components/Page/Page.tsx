import React from 'react'
import { Container } from 'react-bootstrap'

import './Page.scss'

interface Props {
    name: string
    children: React.ReactNode
}

export default function Page({ name, children }: Props) {
    return (
        <div className={`page ${name}-page`} data-testid={`${name}-page`}>
            <Container>
                <div className="page-content">{children}</div>
            </Container>
        </div>
    )
}
