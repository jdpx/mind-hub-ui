import React from 'react'
import classNames from 'classnames'

import { ExtraLarge, Large, Medium, Small } from '../../constants/sizes'
import './Section.scss'
import { Sizes } from '../../types/sizes'

interface Props {
    children: React.ReactNode
    title?: string
    size?: Sizes
    testid?: string
    className?: string
    disabled?: boolean
    withMargin?: boolean
}

export function Section({ children, title, size, testid, className, disabled, withMargin }: Props) {
    const wrapperClass = classNames(
        'content-wrapper',
        {
            sm: size === Small,
            md: size === Medium,
            lg: size === Large,
            xl: size === ExtraLarge,
            disabled: disabled,
            withTitle: !!title,
            margin: withMargin,
        },
        className,
    )

    return (
        <>
            <div className={wrapperClass} data-testid={testid}>
                {title && <h3 className="section-title">{title}</h3>}
                {children}
            </div>
        </>
    )
}
export default Section
