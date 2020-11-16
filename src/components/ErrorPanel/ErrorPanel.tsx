import React from 'react'

import errorIcon from '../../assets/error-icon.svg'

import './ErrorPanel.scss'

interface Props {
    height?: number
    message?: string
    testid?: string
}

const defaultErrorMessage = 'Opps something went wrong. Please try again later'

export default function ErrorPanel({ height = 200, message = defaultErrorMessage, testid }: Props) {
    return (
        <div className="error-panel">
            <img
                src={errorIcon}
                alt="Opps something went wrong"
                height={height}
                data-testid={testid}
            />
            <h1>{message}</h1>
        </div>
    )
}
