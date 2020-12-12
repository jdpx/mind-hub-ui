import React from 'react'
import { render } from '@testing-library/react'

import MindInSalfordLogo from './MindInSalfordLogo'
import MindLogo from './MindLogo'

describe('logos Snapshots', () => {
    it('renders Mind In Salford logo', () => {
        const { asFragment } = render(<MindInSalfordLogo />)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders Mind logo', () => {
        const { asFragment } = render(<MindLogo />)
        expect(asFragment()).toMatchSnapshot()
    })
})
