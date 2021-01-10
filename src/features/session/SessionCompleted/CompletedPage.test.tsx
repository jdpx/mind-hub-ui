import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { BrowserRouter, useParams, useHistory } from 'react-router-dom'
import { History } from 'history'
import faker from 'faker'

import Mock from '../../../helpers/testing/mockType'
import CompletedPage from './CompletedPage'
import { SessionBuilder } from '../../../builders/session'
import { CourseBuilder } from '../../../builders/course'
import { MockGetSessionByIDQuery } from '../../../hooks/mocks/useSessionsMock'
import { MockedProvider } from '@apollo/client/testing'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn(),
    useParams: jest.fn(),
}))
const mockUseParams = useParams as jest.MockedFunction<typeof useParams>
const mockUseHistory = useHistory as jest.MockedFunction<typeof useHistory>

describe('Session Completed Page', () => {
    const courseID = faker.lorem.slug()
    const sessionID = faker.lorem.slug()

    const params = {
        id: sessionID,
        courseId: courseID,
    }

    beforeEach(() => {
        mockUseParams.mockReturnValue(Mock<Record<string, string>>(params))
    })

    const course = CourseBuilder().WithID(courseID).Build()
    const session = SessionBuilder().WithCourse(course).Build()
    const sessionMock = new MockGetSessionByIDQuery().WithID(sessionID).WithSession(session).Build()
    const mocks = [sessionMock]

    it('should render session title', async () => {
        const { getByTestId } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CompletedPage />
            </MockedProvider>,
        )

        expect(getByTestId('loading')).toBeInTheDocument()

        await waitFor(() => getByTestId('session-completed-content'))

        expect(getByTestId('session-title').textContent).toEqual(`Thats it for ${session.title}`)
    })

    describe('when the user clicks the done button', () => {
        const mockHistory = {
            push: jest.fn(),
        }

        beforeEach(() => {
            mockUseHistory.mockReturnValue(Mock<History<unknown>>(mockHistory))
        })

        it('it directs to the course page', async () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <MockedProvider mocks={mocks} addTypename={false}>
                        <CompletedPage />
                    </MockedProvider>
                </BrowserRouter>,
            )

            await waitFor(() => getByTestId('session-completed-content'))

            const input = getByTestId('done-button-btn')
            fireEvent.click(input)

            expect(mockHistory.push).toHaveBeenCalledWith(`/course/${courseID}`)
        })
    })
})
