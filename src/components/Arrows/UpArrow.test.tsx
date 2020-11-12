import React from 'react'
import { render } from '@testing-library/react'
import UpArrow from './UpArrow'

describe('Up Arrow', () => {
    it('renders the up arrow', () => {
        const { getByTestId } = render(<UpArrow testid="arrow" />)

        expect(getByTestId('arrow')).toHaveAttribute('alt', 'Up Arrow')
    })

    it('renders the up arrow with a height', () => {
        const height = 100
        const { getByTestId } = render(<UpArrow height={height} testid="arrow" />)

        expect(getByTestId('arrow')).toHaveAttribute('height', `${height}`)
    })
})
