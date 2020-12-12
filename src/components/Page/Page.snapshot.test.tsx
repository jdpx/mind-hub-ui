import React from 'react'
import { render } from '@testing-library/react'
import Page from './Page'

describe('Page Snapshots', () => {
    const props = {
        name: 'The page',
    }

    it('renders page with child', () => {
        const { asFragment } = render(
            <Page {...props}>
                <div>Testing</div>
            </Page>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
