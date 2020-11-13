import React from 'react'

import emptyCheckbox from '../../assets/checkbox-empty.svg'
import tickedCheckbox from '../../assets/checkbox-ticked.svg'

interface Props {
    checked: boolean
}

export default function Checkbox({ checked }: Props) {
    return !checked ? (
        <img src={emptyCheckbox} alt={`Empty checkbox`} />
    ) : (
        <img src={tickedCheckbox} alt={`Ticked checkbox`} />
    )
}
