import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react'

import Mock from './helpers/testing/mockType'

import App from './App'
import { BrowserRouter } from 'react-router-dom'

jest.mock('@auth0/auth0-react')
const mockUserAuth0 = useAuth0 as jest.MockedFunction<typeof useAuth0>

xdescribe('App', () => {
    describe('when Auth0 has completed loading', () => {
        const mockUseAuth = {
            isLoading: false,
        }
        beforeEach(() => {
            mockUserAuth0.mockReturnValue(Mock<Auth0ContextInterface>(mockUseAuth))
        })

        it('renders the App', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>,
            )

            expect(getByTestId('mind-hub')).toBeInTheDocument()
        })
    })

    describe('when Auth0 is loading', () => {
        const mockUseAuth = {
            isLoading: true,
        }
        beforeEach(() => {
            mockUserAuth0.mockReturnValue(Mock<Auth0ContextInterface>(mockUseAuth))
        })

        it('renders the loading page', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>,
            )

            expect(getByTestId('mind-hub-loading')).toBeInTheDocument()
        })
    })
})
