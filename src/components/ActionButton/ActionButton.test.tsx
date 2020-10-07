import React from 'react'
import { render, screen } from '@testing-library/react'
import ActionButton from './ActionButton'
import { Center, Left, Right, Secondary } from '../../constants/buttons'

describe('ActionButton', () => {
    it('renders the button text', () => {
        render(<ActionButton text={'foo'} testid="action-button" />)

        expect(screen.queryByText(`foo`)).toBeInTheDocument()
    })

    it('renders a primary button', () => {
        const { getByTestId } = render(<ActionButton text={'foo'} testid="action-button" />)

        expect(getByTestId('action-button-btn')).toHaveClass('btn primary')
    })

    it('renders a button to the left', () => {
        const { getByTestId } = render(
            <ActionButton text={'foo'} position={Left} testid="action-button" />,
        )

        expect(getByTestId('action-button')).toHaveClass('btn-wrapper left')
    })

    it('renders a button to the center', () => {
        const { getByTestId } = render(
            <ActionButton text={'foo'} position={Center} testid="action-button" />,
        )

        expect(getByTestId('action-button')).toHaveClass('btn-wrapper center')
    })

    it('renders a button to the right', () => {
        const { getByTestId } = render(
            <ActionButton text={'foo'} position={Right} testid="action-button" />,
        )

        expect(getByTestId('action-button')).toHaveClass('btn-wrapper right')
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
