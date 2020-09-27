import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import LoginButton from './LoginButton'

const mockLoginWithRedirect = jest.fn()
jest.mock('@auth0/auth0-react', () => {
    return {
        useAuth0: jest.fn(() => ({
            loginWithRedirect: mockLoginWithRedirect,
        })),
    }
})

describe('Login Button', () => {
    test('it should render Button', () => {
        const { getByText } = render(<LoginButton />)

        expect(getByText('Log In')).toBeInTheDocument()
    })

    test('on click, it should call loginWithRedirect', () => {
        const { getByTestId } = render(<LoginButton />)
        fireEvent.click(getByTestId('login'))

        expect(mockLoginWithRedirect).toHaveBeenCalled()
    })
})
