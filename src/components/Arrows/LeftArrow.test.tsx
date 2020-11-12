import React from 'react'
import { render } from '@testing-library/react'
import LeftArrow from './LeftArrow'

describe('Left Arrow', () => {
    it('renders the left arrow', () => {
        const { getByTestId } = render(<LeftArrow testid="arrow" />)

        expect(getByTestId('arrow')).toHaveAttribute('alt', 'Left Arrow')
    })

    it('renders the left arrow with a height', () => {
        const height = 100
        const { getByTestId } = render(<LeftArrow height={height} testid="arrow" />)

        expect(getByTestId('arrow')).toHaveAttribute('height', `${height}`)
    })
})
