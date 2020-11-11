import React from 'react'

import emptyCheckbox from '../../assets/checkbox-empty.svg'

interface Props {
    checked?: boolean
}

export default function Checkbox({ checked }: Props) {
    return <img src={emptyCheckbox} alt={`Empty checkbox ${checked}`} />
}
