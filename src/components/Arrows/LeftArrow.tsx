import React from 'react'

import leftArrow from '../../assets/left-arrow.svg'

interface Props {
    height?: number
    testid?: string
}

export default function LeftArrow({ height = 30, testid = 'left-arrow' }: Props) {
    return <img src={leftArrow} alt="Left Arrow" height={height} data-testid={testid} />
}
