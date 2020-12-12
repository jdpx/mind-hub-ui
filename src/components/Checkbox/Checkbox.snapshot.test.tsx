import React from 'react'
import { render } from '@testing-library/react'
import Checkbox from './Checkbox'

describe('Checkbox Snapshots', () => {
    it('renders checked checkbox', () => {
        const { asFragment } = render(<Checkbox checked />)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders unchecked checkbox', () => {
        const { asFragment } = render(<Checkbox />)
        expect(asFragment()).toMatchSnapshot()
    })
})
