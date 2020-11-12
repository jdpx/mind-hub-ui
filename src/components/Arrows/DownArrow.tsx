import React from 'react'

import downArrow from '../../assets/down-arrow.svg'

interface Props {
    height?: number
    testid?: string
}

export default function DownArrow({ height = 30, testid = 'down-arrow' }: Props) {
    return <img src={downArrow} alt="Down Arrow" height={height} data-testid={testid} />
}
