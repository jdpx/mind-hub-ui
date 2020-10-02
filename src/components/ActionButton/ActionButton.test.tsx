import React from 'react'
import { render, screen } from '@testing-library/react'
import ActionButton from './ActionButton'
import { Secondary } from '../../constants/buttons'

describe('ActionButton', () => {
    it('renders the button text', () => {
        render(<ActionButton text={'foo'} testid="action-button" />)

        expect(screen.queryByText(`foo`)).toBeInTheDocument()
    })

    it('renders a primary button', () => {
        const { getByTestId } = render(<ActionButton text={'foo'} testid="action-button" />)

        expect(getByTestId('action-button-btn')).toHaveClass('btn primary')
    })

    it('renders a secondary button', () => {
        const { getByTestId } = render(
            <ActionButton text={'foo'} type={Secondary} testid="action-button" />,
        )

        expect(getByTestId('action-button-btn')).toHaveClass('btn secondary')
    })

    it('renders a disabled button', () => {
        const { getByTestId } = render(
            <ActionButton text={'foo'} disabled testid="action-button" />,
        )

        expect(getByTestId('action-button-btn')).toHaveClass('btn primary disabled')
        expect(getByTestId('action-button-btn')).toHaveAttribute('disabled')
    })
})
