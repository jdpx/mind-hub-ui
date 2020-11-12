import React from 'react'
import { render } from '@testing-library/react'
import DownArrow from './DownArrow'

describe('Down Arrow', () => {
    it('renders the down arrow', () => {
        const { getByTestId } = render(<DownArrow testid="arrow" />)

        expect(getByTestId('arrow')).toHaveAttribute('alt', 'Down Arrow')
    })

    it('renders the down arrow with a height', () => {
        const height = 100
        const { getByTestId } = render(<DownArrow height={height} testid="arrow" />)

        expect(getByTestId('arrow')).toHaveAttribute('height', `${height}`)
    })
})
