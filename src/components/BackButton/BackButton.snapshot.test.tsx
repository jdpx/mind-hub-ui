import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BackButton from './BackButton'

describe('BackButton Snapshots', () => {
    const props = {
        text: 'foo',
        to: '/testing',
    }

    it('renders back button', () => {
        const { asFragment } = render(
            <BrowserRouter>
                <BackButton {...props} />
            </BrowserRouter>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
