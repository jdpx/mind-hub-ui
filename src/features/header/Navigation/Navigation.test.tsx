/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { render } from '@testing-library/react'
import * as Auth0 from '@auth0/auth0-react'
import Navigation from './Navigation'

describe('Navigation', () => {
    describe('when the user is authenticated', () => {
        it('renders AuthenticatedNavigation component', () => {
            const mock = jest.spyOn(Auth0, 'useAuth0')

            // @ts-ignore
            mock.mockReturnValue({
                isAuthenticated: true,
            })

            const { getByTestId } = render(<Navigation />)

            expect(getByTestId('authenticated-navigation')).toBeInTheDocument()
        })
    })

    describe('when the user is authenticated', () => {
        it('renders AuthenticatedNavigation component', () => {
            const mock = jest.spyOn(Auth0, 'useAuth0')

            // @ts-ignore
            mock.mockReturnValue({
                isAuthenticated: false,
            })

            const { getByTestId } = render(<Navigation />)

            expect(getByTestId('unauthenticated-navigation')).toBeInTheDocument()
        })
    })
})
