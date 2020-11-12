import React from 'react'
import { Link } from 'react-router-dom'
import LeftArrow from '../Arrows/LeftArrow'

import './BackButton.scss'

interface Props {
    text: string
    to: string
    testid?: string
}

export default function BackButton({ text, to, testid }: Props) {
    return (
        <div className="back-button">
            <Link to={{ pathname: to }} data-testid={testid}>
                <LeftArrow height={18} />
                {text}
            </Link>
        </div>
    )
}
