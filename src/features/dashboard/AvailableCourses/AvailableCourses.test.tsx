import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryTuple } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'

import Mock from '../../../helpers/testing/mockType'
import AvailableCourses from './AvailableCourses'
import { CourseBuilder } from '../../../builders/course'
import { MockGeAllQuery } from '../../../hooks/mocks/useCourseMock'

describe.skip('Available Courses', () => {
    const course = CourseBuilder().WithRandomID().Build()
    const courseTwo = CourseBuilder().WithRandomID().Build()
    const coursesMock = new MockGeAllQuery().WithCourses([course, courseTwo]).Build()
    const mocks = [coursesMock]

    it('should render available courses', async () => {
        const { getByTestId, debug } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <AvailableCourses />
            </MockedProvider>,
        )

        expect(getByTestId('loading')).toBeInTheDocument()

        await waitFor(() => getByTestId('course-list'))

        debug()
        const items = getByTestId('course-list').getElementsByClassName('content-wrapper')

        expect(items).toHaveLength(2)
    })

    describe.skip('when the page is loading', () => {
        const course = CourseBuilder().Build()
        const mockGetAvailableCourses = jest.fn()
        const queryRepsonse = {
            loading: false,
            data: {
                courses: [course],
            },
        }

        beforeEach(() => {
            mockUseQuery.mockReturnValue(
                Mock<QueryTuple<unknown, unknown>>([mockGetAvailableCourses, queryRepsonse]),
            )
        })

        it('renders the loading component', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <AvailableCourses />
                </BrowserRouter>,
            )

            expect(mockGetAvailableCourses).toHaveBeenCalled()
            expect(getByTestId('available-courses')).toBeInTheDocument()
            expect(screen.queryByText('Loading')).not.toBeInTheDocument()
            expect(getByTestId(course.id)).toBeInTheDocument()
        })
    })
})
