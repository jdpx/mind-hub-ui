import React from 'react'

import notFoundIcon from '../../assets/404.svg'

import './NotFound.scss'

interface Props {
    height?: number
    message?: string
    testid?: string
}

const defaultMessage = 'Opps we could not find what you were looking for'

export default function NotFound({ height = 200, message = defaultMessage, testid }: Props) {
    return (
        <div className="not-found-panel">
            <img src={notFoundIcon} alt="Not found" height={height} data-testid={testid} />
            <h1>{message}</h1>
        </div>
    )
}
