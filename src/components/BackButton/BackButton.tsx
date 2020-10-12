import React from 'react'
import { Link } from 'react-router-dom'
import LeftArrow from '../generic/LeftArrow'

import './BackButton.scss'

interface Props {
    text: string
    to: string
    testid?: string
}

export default function BackButton({ text, to, testid = 'back-button' }: Props) {
    return (
        <div className="back-button">
            <Link to={{ pathname: to }} data-testid={testid}>
                <LeftArrow height={18} />
                {text}
            </Link>
        </div>
    )
}
