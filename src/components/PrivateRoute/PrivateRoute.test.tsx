import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { Auth0Client } from '@auth0/auth0-spa-js'
import { Auth0Provider } from '@auth0/auth0-react'
import PrivateRoute from './PrivateRoute'
import { BrowserRouter } from 'react-router-dom'

//github.com/auth0/auth0-react/blob/bb8ec720d85fad347e9105a7dc36e3de9cd29a85/__tests__/with-authentication-required.test.tsx
// https://stackoverflow.com/questions/54090231/how-to-fix-error-not-implemented-navigation-except-hash-changes
jest.mock('@auth0/auth0-spa-js')

const mockClient = new Auth0Client({ client_id: '', domain: '' })

const mockResponse = jest.fn()
Object.defineProperty(window, 'location', {
    value: {
        hash: {
            endsWith: mockResponse,
            includes: mockResponse,
        },
        assign: mockResponse,
    },
    writable: true,
})

const mockUserAuth0 = mockClient.getUser as jest.MockedFunction<typeof mockClient.getUser>

describe('PrivateRoute', () => {
    it('should block access to a private component when not authenticated', async () => {
        mockUserAuth0.mockResolvedValue(false)

        const MyComponent = (): JSX.Element => <>Private</>

        const { getByTestId } = render(
            <BrowserRouter>
                <Auth0Provider clientId="__test_client_id__" domain="__test_domain__">
                    <PrivateRoute component={MyComponent} />
                </Auth0Provider>
            </BrowserRouter>,
        )

        await waitFor(() => expect(getByTestId('loading')).toBeInTheDocument())
    })

    it('should allow access to a private component when not authenticated', async () => {
        mockUserAuth0.mockResolvedValue('__test_user__')

        const MyComponent = (): JSX.Element => <div data-testid={'private'}>Private</div>

        const { getByTestId } = render(
            <BrowserRouter>
                <Auth0Provider clientId="__test_client_id__" domain="__test_domain__">
                    <PrivateRoute component={MyComponent} />
                </Auth0Provider>
            </BrowserRouter>,
        )

        await waitFor(() => expect(getByTestId('loading')).toBeInTheDocument())
        await waitFor(() => expect(mockClient.loginWithRedirect).not.toHaveBeenCalled())
        await waitFor(() => expect(screen.queryByText('ds')).not.toBeInTheDocument())
    })
})
