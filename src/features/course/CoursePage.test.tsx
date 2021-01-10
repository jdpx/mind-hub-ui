import React from 'react'
import { render, waitFor } from '@testing-library/react'
import faker from 'faker'
import { useParams, useHistory, BrowserRouter } from 'react-router-dom'
import { History } from 'history'
import { MockedProvider } from '@apollo/client/testing'

import Mock from '../../helpers/testing/mockType'
import CoursePage from './CoursePage'
import { CourseBuilder } from '../../builders/course'
import { MockGetCourseByIDQuery } from '../../hooks/mocks/useCourseMock'
import { MockGetSessionByCourseIDQuery } from '../../hooks/mocks/useSessionsMock'
import { SessionBuilder } from '../../builders/session'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn(),
    useParams: jest.fn(),
}))

const mockUseHistory = useHistory as jest.MockedFunction<typeof useHistory>

const mockHistory = {
    push: jest.fn(),
}

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>

describe.skip('Course Page', () => {
    const courseID = faker.lorem.slug()

    const urlParams = {
        id: courseID,
    }

    const course = CourseBuilder().WithID(courseID).Build()
    const courseMock = new MockGetCourseByIDQuery().WithID(courseID).WithCourse(course).Build()

    const session = SessionBuilder().WithRandomID().Build()
    const sessionTwo = SessionBuilder().WithRandomID().Build()
    const sessionMock = new MockGetSessionByCourseIDQuery()
        .WithCourseID(courseID)
        .WithSessions([session, sessionTwo])
        .Build()

    const mocks = [courseMock, sessionMock]

    beforeEach(() => {
        mockUseHistory.mockReturnValue(Mock<History<unknown>>(mockHistory))
        mockUseParams.mockReturnValue(Mock<Record<string, string>>(urlParams))
    })

    it('renders the loading panel', async () => {
        const { getByTestId } = render(
            // <BrowserRouter>
            <MockedProvider mocks={mocks} addTypename={false}>
                <CoursePage />
            </MockedProvider>,
            // </BrowserRouter>,
        )

        expect(getByTestId('loading')).toBeInTheDocument()

        await waitFor(() => getByTestId('course-information'))

        expect(getByTestId('course-information')).toBeInTheDocument()
    })

    describe.skip('when the query is loading', () => {
        const mockGetCourse = jest.fn()
        // const queryRepsonse = {
        //     loading: true,
        // }

        beforeEach(() => {
            // mockUseQuery.mockReturnValue(
            //     Mock<QueryTuple<unknown, unknown>>([mockGetCourse, queryRepsonse]),
            // )
        })

        it('renders to the loading component', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <MockedProvider>
                        <CoursePage />
                    </MockedProvider>
                </BrowserRouter>,
            )

            expect(mockGetCourse).toHaveBeenCalled()
            expect(getByTestId('course-page')).toBeInTheDocument()
            // expect(screen.queryByText('Loading')).toBeInTheDocument()
        })
    })

    describe.skip('when the query has finished loading loading', () => {
        const mockGetCourse = jest.fn()
        // const course = CourseBuilder().Build()
        // const queryRepsonse = {
        //     loading: false,
        //     data: {
        //         course: course,
        //     },
        // }

        beforeEach(() => {
            // mockUseQuery.mockReturnValue(
            //     Mock<QueryTuple<unknown, unknown>>([mockGetCourse, queryRepsonse]),
            // )
        })

        it('renders to the Course Information component', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <MockedProvider>
                        <CoursePage />
                    </MockedProvider>
                </BrowserRouter>,
            )

            expect(mockGetCourse).toHaveBeenCalled()
            expect(getByTestId('course-information')).toBeInTheDocument()
            // expect(screen.queryByText('Loading')).not.toBeInTheDocument()
        })
    })
})
