import React from 'react'
import classNames from 'classnames'

import { ExtraLarge, Large, Medium, Small } from '../../constants/sizes'
import './Section.scss'
import { Sizes } from '../../types/sizes'

interface Props {
    children: React.ReactNode
    size?: Sizes
    testid?: string
    className?: string
}

export function Section({ children, size = Small, testid, className }: Props) {
    const wrapperClass = classNames(
        'content-wrapper',
        {
            sm: size === Small,
            md: size === Medium,
            lg: size === Large,
            xl: size === ExtraLarge,
        },
        className,
    )

    return (
        <div className={wrapperClass} data-testid={testid}>
            {children}
        </div>
    )
}
export default Section
