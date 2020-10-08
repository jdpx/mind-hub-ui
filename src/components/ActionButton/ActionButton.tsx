import React from 'react'
import classNames from 'classnames'

import { Center, Primary } from '../../constants/buttons'
import { ButtonTypes, Positions } from '../../types/buttons'

import './ActionButton.scss'

interface Props {
    text: string
    position?: Positions
    type?: ButtonTypes
    disabled?: boolean
    onClick?: () => void
    testid?: string
}

export default function ActionButton({
    text,
    position = Center,
    type = Primary,
    disabled,
    onClick,
    testid,
}: Props) {
    const buttonClass = classNames('btn', type, {
        disabled: disabled,
    })

    const wrapperClass = classNames('btn-wrapper', position)

    return (
        <div className={wrapperClass} data-testid={testid}>
            <button
                className={buttonClass}
                onClick={onClick}
                disabled={disabled}
                data-testid={`${testid}-btn`}
            >
                {text}
            </button>
        </div>
    )
}
