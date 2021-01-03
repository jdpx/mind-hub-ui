import React from 'react'
import { render } from '@testing-library/react'
import ErrorPanel from './ErrorPanel'

describe('ErrorPanel Snapshots', () => {
    it('renders error panel', () => {
        const { asFragment } = render(<ErrorPanel />)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders error panel with custom message', () => {
        const { asFragment } = render(<ErrorPanel message="An error occurred" />)
        expect(asFragment()).toMatchSnapshot()
    })
})
