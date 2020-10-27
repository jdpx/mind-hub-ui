import React from 'react'
import { render, screen } from '@testing-library/react'
import faker from 'faker'
import { QueryResult, useQuery } from '@apollo/client'
import { BrowserRouter, useParams } from 'react-router-dom'

import Mock from '../../helpers/testing/mockType'
import CoursePage from './CoursePage'
import { CourseBuilder } from '../../builders/course'
import { MockedProvider } from '@apollo/client/testing'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}))
const mockUseParams = useParams as jest.MockedFunction<typeof useParams>

const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>

jest.mock('@apollo/client', () => ({
    ...jest.requireActual('@apollo/client'),
    useQuery: jest.fn(),
}))

describe('Course Page', () => {
    const courseID = faker.lorem.slug()

    const params = {
        id: courseID,
    }

    beforeEach(() => {
        mockUseParams.mockReturnValue(Mock<Record<string, string>>(params))
    })

    describe('when the query is loading', () => {
        const queryRepsonse = {
            loading: true,
        }

        beforeEach(() => {
            mockUseQuery.mockReturnValue(Mock<QueryResult<unknown, unknown>>(queryRepsonse))
        })

        it('renders to the loading component', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <MockedProvider>
                        <CoursePage />
                    </MockedProvider>
                </BrowserRouter>,
            )

            expect(getByTestId('course-page')).toBeInTheDocument()
            expect(screen.queryByText('Loading')).toBeInTheDocument()
        })
    })

    describe('when the query has finished loading loading', () => {
        const course = CourseBuilder().Build()
        const queryRepsonse = {
            loading: false,
            data: {
                course: course,
            },
        }

        beforeEach(() => {
            mockUseQuery.mockReturnValue(Mock<QueryResult<unknown, unknown>>(queryRepsonse))
        })

        it('renders to the Course Information component', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <MockedProvider>
                        <CoursePage />
                    </MockedProvider>
                </BrowserRouter>,
            )

            expect(getByTestId('course-information')).toBeInTheDocument()
            expect(screen.queryByText('Loading')).not.toBeInTheDocument()
        })
    })
})
