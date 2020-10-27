import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MutationResult, MutationTuple, useMutation } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import faker from 'faker'

import { CourseBuilder } from '../../builders/course'
import CourseInformation from './CourseInformation'
import { SessionBuilder } from '../../builders/session'

jest.mock('@apollo/client')
const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>

describe('Course Information', () => {
    const session = SessionBuilder().Build()
    const sessionTwo = SessionBuilder().ID('111').Build()
    const course = CourseBuilder().WithSession(session).WithSession(sessionTwo).Build()

    const mockMutation = jest.fn()

    const mutationRepsons: MutationTuple<unknown, unknown> = [
        mockMutation,
        {} as MutationResult<unknown>,
    ]

    beforeEach(() => {
        mockMutation.mockReset()
        mockUseMutation.mockReturnValue(mutationRepsons)
    })

    it('should render title', () => {
        render(
            <BrowserRouter>
                <CourseInformation course={course} />,
            </BrowserRouter>,
        )

        expect(screen.queryByText(course.title)).toBeInTheDocument()
    })

    it('should render description', () => {
        render(
            <BrowserRouter>
                <CourseInformation course={course} />,
            </BrowserRouter>,
        )

        expect(screen.queryByText(course.description)).toBeInTheDocument()
    })

    describe('given there are sessions', () => {
        const session = SessionBuilder().Build()
        const sessionTwo = SessionBuilder().ID('111').Build()
        const course = CourseBuilder().WithSession(session).WithSession(sessionTwo).Build()

        it('should render sessions', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <CourseInformation course={course} />,
                </BrowserRouter>,
            )

            expect(getByTestId(`course-${course.id}-session-${session.id}`)).toBeTruthy()
        })

        it('should render a link to the first session page if there are sessions', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <CourseInformation course={course} />,
                </BrowserRouter>,
            )

            expect(getByTestId('start-button')).toHaveAttribute(
                'href',
                `/course/${course.id}/session/${session.id}`,
            )
            expect(screen.queryByText(session.title)).toBeInTheDocument()
        })
    })

    describe('if there are no sessions for the course', () => {
        const course = CourseBuilder().Build()

        it('should show the No Available Sessions section', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <CourseInformation course={course} />,
                </BrowserRouter>,
            )

            expect(getByTestId(`course-no-sessions`)).toBeInTheDocument()
        })

        it('should not show the start button', () => {
            const { queryByTestId } = render(
                <BrowserRouter>
                    <CourseInformation course={course} />,
                </BrowserRouter>,
            )

            expect(queryByTestId(`start-button`)).not.toBeInTheDocument()
        })
    })

    describe('given the user edits the note for a course', () => {
        it('it makes the note mutation', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <CourseInformation course={course} />,
                </BrowserRouter>,
            )

            const noteValue = faker.lorem.words(2)
            const input = getByTestId(`course-${course.id}-notes`)

            fireEvent.change(input, { target: { value: noteValue } })
            fireEvent.blur(input)

            expect(mockMutation).toHaveBeenCalledWith({
                variables: { courseID: course.id, value: noteValue },
            })
        })
    })
})
