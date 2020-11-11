import React from 'react'
import { render, screen } from '@testing-library/react'
import faker from 'faker'
import { QueryTuple, useLazyQuery } from '@apollo/client'
import { BrowserRouter, useParams } from 'react-router-dom'

import Mock from '../../helpers/testing/mockType'
import CoursePage from './CoursePage'
import { CourseBuilder } from '../../builders/course'
import { MockedProvider } from '@apollo/client/testing'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn(),
    useParams: jest.fn(),
}))
const mockUseParams = useParams as jest.MockedFunction<typeof useParams>

const mockUseQuery = useLazyQuery as jest.MockedFunction<typeof useLazyQuery>

jest.mock('@apollo/client', () => ({
    ...jest.requireActual('@apollo/client'),
    useLazyQuery: jest.fn(),
}))

describe('Course Page', () => {
    const courseID = faker.lorem.slug()

    const urlParams = {
        id: courseID,
    }

    beforeEach(() => {
        mockUseParams.mockReturnValue(Mock<Record<string, string>>(urlParams))
    })

    describe('when the query is loading', () => {
        const mockGetCourse = jest.fn()
        const queryRepsonse = {
            loading: true,
        }

        beforeEach(() => {
            mockUseQuery.mockReturnValue(
                Mock<QueryTuple<unknown, unknown>>([mockGetCourse, queryRepsonse]),
            )
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
            expect(screen.queryByText('Loading')).toBeInTheDocument()
        })
    })

    describe('when the query has finished loading loading', () => {
        const mockGetCourse = jest.fn()
        const course = CourseBuilder().Build()
        const queryRepsonse = {
            loading: false,
            data: {
                course: course,
            },
        }

        beforeEach(() => {
            mockUseQuery.mockReturnValue(
                Mock<QueryTuple<unknown, unknown>>([mockGetCourse, queryRepsonse]),
            )
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
            expect(screen.queryByText('Loading')).not.toBeInTheDocument()
        })
    })
})
