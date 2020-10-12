import React from 'react'

interface Props {
    testid?: string
}

export default function Loading({ testid = 'loading' }: Props) {
    return <div data-testid={testid}>Loading</div>
}
Loading.displayName = 'Loading'
