import React from 'react'
import { render } from '@testing-library/react'
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react'
import faker from 'faker'
import { MockedProvider } from '@apollo/client/testing'

import Mock from '../../helpers/testing/mockType'
import DashboardPage from './DashboardPage'
import { User } from '@auth0/auth0-react/dist/auth-state'

jest.mock('@auth0/auth0-react')
const mockUserAuth0 = useAuth0 as jest.MockedFunction<typeof useAuth0>

describe('DashboardPage', () => {
    const usersName = faker.name.findName()
    const mockAuthUser: User = {
        name: usersName,
    }

    const mockUseAuth = {
        user: mockAuthUser,
    }
    beforeEach(() => {
        mockUserAuth0.mockReturnValue(Mock<Auth0ContextInterface>(mockUseAuth))
    })

    it('should display the users name in the title', () => {
        const { getByTestId } = render(
            <MockedProvider addTypename={false}>
                <DashboardPage />
            </MockedProvider>,
        )

        expect(getByTestId('dashboard-header')).toHaveTextContent(`Welcome ${usersName}`)
    })
})
