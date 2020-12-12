import React from 'react'
import { render } from '@testing-library/react'
import ActionButton from './ActionButton'
import { Secondary } from '../../constants/buttons'

describe('ActionButton Snapshots', () => {
    const props = {
        text: 'foo',
    }

    it('renders action button', () => {
        const { asFragment } = render(<ActionButton {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders secondary type button', () => {
        const { asFragment } = render(<ActionButton type={Secondary} {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders a disabled button', () => {
        const { asFragment } = render(<ActionButton disabled {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders button with testid', () => {
        const { asFragment } = render(<ActionButton testid="action-button" {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
