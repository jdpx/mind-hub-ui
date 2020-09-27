import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import LogoutButton from './LogoutButton'

const mockLogout = jest.fn()
jest.mock('@auth0/auth0-react', () => {
    return {
        useAuth0: jest.fn(() => ({
            logout: mockLogout,
        })),
    }
})

describe('LogoutButton', () => {
    it('it should render Button', () => {
        const { getByText } = render(<LogoutButton />)

        expect(getByText('Log Out')).toBeInTheDocument()
    })

    it('on click, it should call loginWithRedirect', () => {
        const { getByTestId } = render(<LogoutButton />)
        fireEvent.click(getByTestId('logout'))

        expect(mockLogout).toHaveBeenCalled()
    })
})
