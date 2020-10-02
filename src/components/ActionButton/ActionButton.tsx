import React from 'react'
import classNames from 'classnames'

import { Primary } from '../../constants/buttons'
import { ButtonTypes } from '../../types/buttons'

import './ActionButton.scss'

interface Props {
    text: string
    type?: ButtonTypes
    disabled?: boolean
    testid?: string
}

export default function ActionButton({ text, type = Primary, disabled, testid }: Props) {
    const buttonClass = classNames('btn', type, {
        disabled: disabled,
    })

    return (
        <div className="btn-wrapper" data-testid={testid}>
            <button className={buttonClass} disabled data-testid={`${testid}-btn`}>
                {text}
            </button>
        </div>
    )
}
