import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'

import Header from './Header'
import Mock from 'helpers/testing/mockType'

jest.mock('@auth0/auth0-react')
const mockUserAuth0 = useAuth0 as jest.MockedFunction<typeof useAuth0>

describe('Header', () => {
    describe('when the user is authenticated', () => {
        const mockUseAuth = {
            isAuthenticated: true,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
        }
        beforeEach(() => {
            mockUserAuth0.mockReturnValue(Mock<Auth0ContextInterface>(mockUseAuth))
        })

        it('renders logged in header component', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <Header />
                </BrowserRouter>,
            )
            expect(getByTestId('logout-link')).toBeInTheDocument()
        })

        it('clicking log out, it should call logout', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <Header />
                </BrowserRouter>,
            )
            fireEvent.click(getByTestId('logout-link'))

            expect(mockUseAuth.logout).toHaveBeenCalled()
        })
    })

    describe('when the user is not authenticated', () => {
        const mockUseAuth = {
            isAuthenticated: false,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
        }
        beforeEach(() => {
            mockUserAuth0.mockReturnValue(Mock<Auth0ContextInterface>(mockUseAuth))
        })

        it('renders logged out header component', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <Header />
                </BrowserRouter>,
            )

            expect(getByTestId('login-link')).toBeInTheDocument()
        })

        it('clicking on log in, it should call loginWithRedirect', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <Header />
                </BrowserRouter>,
            )
            fireEvent.click(getByTestId('login-link'))

            expect(mockUseAuth.loginWithRedirect).toHaveBeenCalled()
        })
    })
})
