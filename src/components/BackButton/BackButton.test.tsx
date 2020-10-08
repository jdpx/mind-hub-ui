import React from 'react'
import { render, screen } from '@testing-library/react'
import BackButton from './BackButton'
import { BrowserRouter } from 'react-router-dom'

describe('Back Button', () => {
    it('renders the back button text', () => {
        render(
            <BrowserRouter>
                <BackButton text={'foo'} to="/course" testid="back-button" />)
            </BrowserRouter>,
        )

        expect(screen.queryByText(`foo`)).toBeInTheDocument()
    })

    it('renders the back button text', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <BackButton text={'foo'} to="/course" testid="back-button" />)
            </BrowserRouter>,
        )

        expect(getByTestId('back-button')).toHaveAttribute('href', '/course')
    })
})
