import React from 'react'
import { render } from '@testing-library/react'
import DownArrow from './DownArrow'
import UpArrow from './UpArrow'
import LeftArrow from './LeftArrow'

describe('Arrows Snapshots', () => {
    describe('DownArrow', () => {
        it('renders down arrow', () => {
            const { asFragment } = render(<DownArrow />)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe('UpArrow', () => {
        it('renders up arrow', () => {
            const { asFragment } = render(<UpArrow />)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe('LeftArrow', () => {
        it('renders left arrow', () => {
            const { asFragment } = render(<LeftArrow />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
