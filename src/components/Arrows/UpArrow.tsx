import React from 'react'

import upArrow from '../../assets/up-arrow.svg'

interface Props {
    height?: number
    testid?: string
}

export default function UpArrow({ height = 30, testid = 'up-arrow' }: Props) {
    return <img src={upArrow} alt="Up Arrow" height={height} data-testid={testid} />
}
