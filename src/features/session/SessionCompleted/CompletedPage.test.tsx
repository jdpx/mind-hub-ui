import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { QueryTuple, useLazyQuery } from '@apollo/client'
import { BrowserRouter, useParams, useHistory } from 'react-router-dom'
import { History } from 'history'
import faker from 'faker'

import Mock from '../../../helpers/testing/mockType'
import CompletedPage from './CompletedPage'
import { SessionBuilder } from '../../../builders/session'
import { CourseBuilder } from '../../../builders/course'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn(),
    useParams: jest.fn(),
}))
const mockUseParams = useParams as jest.MockedFunction<typeof useParams>
const mockUseHistory = useHistory as jest.MockedFunction<typeof useHistory>

const mockUseQuery = useLazyQuery as jest.MockedFunction<typeof useLazyQuery>

jest.mock('@apollo/client', () => ({
    ...jest.requireActual('@apollo/client'),
    useLazyQuery: jest.fn(),
}))

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

    describe('when the query is Loading', () => {
        const mockGetSession = jest.fn()
        const queryRepsonse = {
            loading: true,
        }

        mockUseQuery.mockReturnValueOnce(
            Mock<QueryTuple<unknown, unknown>>([mockGetSession, queryRepsonse]),
        )

        it('renders to the loading component', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <CompletedPage />
                </BrowserRouter>,
            )

            expect(mockGetSession).toHaveBeenCalled()
            expect(getByTestId('session-completed-page')).toBeInTheDocument()
            expect(screen.queryByText('Loading')).toBeInTheDocument()
        })
    })

    describe('when the query has finished loading', () => {
        const mockGetSession = jest.fn()
        const course = CourseBuilder().WithID(courseID).Build()
        const session = SessionBuilder().WithCourse(course).Build()
        const queryRepsonse = {
            loading: false,
            data: {
                session,
            },
        }

        mockUseQuery.mockReturnValueOnce(
            Mock<QueryTuple<unknown, unknown>>([mockGetSession, queryRepsonse]),
        )

        it('renders to the Course Information component', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <CompletedPage />
                </BrowserRouter>,
            )

            expect(mockGetSession).toHaveBeenCalled()
            expect(getByTestId('session-completed-page')).toBeInTheDocument()
            expect(screen.queryByText('Loading')).not.toBeInTheDocument()
        })

        describe('when the user clicks the done button', () => {
            const queryRepsonse = {
                loading: false,
                data: {
                    session,
                },
            }

            mockUseQuery.mockReturnValueOnce(
                Mock<QueryTuple<unknown, unknown>>([mockGetSession, queryRepsonse]),
            )

            const mockHistory = {
                push: jest.fn(),
            }

            mockUseHistory.mockReturnValue(Mock<History<unknown>>(mockHistory))

            it('it directs to the course page', () => {
                const { getByTestId } = render(
                    <BrowserRouter>
                        <CompletedPage />
                    </BrowserRouter>,
                )

                const input = getByTestId('done-button-btn')
                fireEvent.click(input)

                expect(mockHistory.push).toHaveBeenCalledWith(`/course/${courseID}`)
            })
        })
    })
})
