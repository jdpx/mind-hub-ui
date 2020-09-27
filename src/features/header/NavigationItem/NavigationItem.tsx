import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    name: string
    linkTo: string
}

export default function NavigationItem({ name, linkTo }: Props) {
    return (
        <div>
            <Link to={linkTo}>{name}</Link>
        </div>
    )
}
