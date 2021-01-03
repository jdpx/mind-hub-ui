import React from 'react'
import { render } from '@testing-library/react'

import Loading from './Loading'

describe('Loading Snapshots', () => {
    it('renders loading panel', () => {
        const { asFragment } = render(<Loading />)
        expect(asFragment()).toMatchSnapshot()
    })
})
