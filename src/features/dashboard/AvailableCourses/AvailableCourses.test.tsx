import React from 'react'
import { render, screen } from '@testing-library/react'
import { QueryResult, QueryTuple, useLazyQuery } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

import Mock from '../../../helpers/testing/mockType'
import AvailableCourses from './AvailableCourses'
import { CourseBuilder } from '../../../builders/course'

jest.mock('@apollo/client')
const mockUseQuery = useLazyQuery as jest.MockedFunction<typeof useLazyQuery>

describe('Available Courses', () => {
    describe('when the page is loading', () => {
        const mockGetAvailableCourses = jest.fn()
        const queryRepsonse = {
            loading: true,
        }

        beforeEach(() => {
            mockUseQuery.mockReturnValue(
                Mock<QueryTuple<unknown, unknown>>([mockGetAvailableCourses, queryRepsonse]),
            )
        })

        it('renders the loading component', () => {
            const { getByTestId } = render(<AvailableCourses />)

            expect(mockGetAvailableCourses).toHaveBeenCalled()
            expect(getByTestId('available-courses')).toBeInTheDocument()
            expect(screen.queryByText('Loading')).toBeInTheDocument()
        })
    })

    describe('when the page is loading', () => {
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
