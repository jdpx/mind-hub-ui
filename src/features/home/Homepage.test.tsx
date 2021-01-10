import React from 'react'
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react'
import { render, waitFor } from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import Mock from '../../helpers/testing/mockType'

import Homepage from './Homepage'

jest.mock('@auth0/auth0-react')
const mockUserAuth0 = useAuth0 as jest.MockedFunction<typeof useAuth0>

describe('Homepage', () => {
    describe('when the user is not authenticated', () => {
        const mockUseAuth = {
            isAuthenticated: false,
        }
        beforeEach(() => {
            mockUserAuth0.mockReturnValue(Mock<Auth0ContextInterface>(mockUseAuth))
        })

        it('renders the homepage', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <Homepage />
                </BrowserRouter>,
            )
            expect(getByTestId('home-page')).toBeInTheDocument()
        })
    })

    describe('when the user is authenticated', () => {
        const mockUseAuth = {
            isAuthenticated: true,
        }
        beforeEach(() => {
            mockUserAuth0.mockReturnValue(Mock<Auth0ContextInterface>(mockUseAuth))
        })

        it('renders the homepage', async () => {
            const { container } = render(
                <BrowserRouter>
                    <Homepage />
                    <Route path="/dashboard">Dashboard</Route>
                </BrowserRouter>,
            )

            await waitFor(() => expect(container).toHaveTextContent(/Dashboard/))
        })
    })
})
