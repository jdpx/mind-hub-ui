import React from 'react'
import { render, screen } from '@testing-library/react'
import { QueryResult, useQuery } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

import Mock from '../../../helpers/testing/mockType'
import AvailableCourses from './AvailableCourses'
import { CourseBuilder } from '../../../builders/course'

jest.mock('@apollo/client')
const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>

describe('Available Courses', () => {
    describe('when the page is loading', () => {
        const queryRepsonse = {
            loading: true,
        }

        beforeEach(() => {
            mockUseQuery.mockReturnValue(Mock<QueryResult<unknown, unknown>>(queryRepsonse))
        })

        it('renders the loading component', () => {
            const { getByTestId } = render(<AvailableCourses />)

            expect(getByTestId('available-courses')).toBeInTheDocument()
            expect(screen.queryByText('Loading')).toBeInTheDocument()
        })
    })

    describe('when the page is loading', () => {
        const course = CourseBuilder().Build()
        const queryRepsonse = {
            loading: false,
            data: {
                courses: [course],
            },
        }

        beforeEach(() => {
            mockUseQuery.mockReturnValue(Mock<QueryResult<unknown, unknown>>(queryRepsonse))
        })

        it('renders the loading component', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <AvailableCourses />
                </BrowserRouter>,
            )

            expect(getByTestId('available-courses')).toBeInTheDocument()
            expect(screen.queryByText('Loading')).not.toBeInTheDocument()
            expect(getByTestId(course.id)).toBeInTheDocument()
        })
    })
})
