import React from 'react'

import emptyCheckbox from '../../assets/checkbox-empty.svg'
import tickedCheckbox from '../../assets/checkbox-ticked.svg'

interface Props {
    checked?: boolean
    testid?: string
}

export default function Checkbox({ checked, testid }: Props) {
    return !checked ? (
        <img
            src={emptyCheckbox}
            alt={`Empty checkbox`}
            height={50}
            data-testid={`${testid}-empty`}
        />
    ) : (
        <img
            src={tickedCheckbox}
            alt={`Ticked checkbox`}
            height={29}
            data-testid={`${testid}-checked`}
        />
    )
}
