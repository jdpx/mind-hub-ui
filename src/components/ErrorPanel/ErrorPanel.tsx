import React from 'react'

import errorIcon from '../../assets/error-icon.svg'

interface Props {
    height?: number
    testid?: string
}

export default function ErrorPanel({ height = 30, testid }: Props) {
    return (
        <img src={errorIcon} alt="Opps something went wrong" height={height} data-testid={testid} />
    )
}
