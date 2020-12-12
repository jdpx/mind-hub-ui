import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MutationResult, MutationTuple, useMutation } from '@apollo/client'
import { BrowserRouter, useHistory } from 'react-router-dom'
import { History } from 'history'
import faker from 'faker'

import { CourseBuilder } from '../../builders/course'
import CourseInformation from './CourseInformation'
import { SessionBuilder } from '../../builders/session'
import { CourseProgressBuilder } from '../../builders/courseProgress'
import Mock from '../../helpers/testing/mockType'
import ProgressContextProvider from '../../context/progressContext'

jest.mock('@apollo/client')
const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn(),
}))
const mockUseHistory = useHistory as jest.MockedFunction<typeof useHistory>

xdescribe('Course Information', () => {
    const session = SessionBuilder().Build()
    const sessionTwo = SessionBuilder().ID('111').Build()
    const course = CourseBuilder().WithSession(session).WithSession(sessionTwo).Build()

    const emptyMockNoteUpdateMutationResponse: MutationTuple<unknown, unknown> = [
        jest.fn(),
        {} as MutationResult<unknown>,
    ]
    const emptyMockCourseStartedeMutationResponse: MutationTuple<unknown, unknown> = [
        jest.fn(),
        {} as MutationResult<unknown>,
    ]

    beforeEach(() => {
        mockUseMutation.mockReturnValueOnce(emptyMockCourseStartedeMutationResponse)
        mockUseMutation.mockReturnValueOnce(emptyMockNoteUpdateMutationResponse)
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
        const course = CourseBuilder().WithSessions([session, sessionTwo]).Build()

        it('should render sessions', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <CourseInformation course={course} />,
                </BrowserRouter>,
            )

            const sessions = getByTestId('course-sessions').getElementsByClassName('course-session')

            expect(sessions.length).toEqual(2)
        })
    })

    describe('given there are no sessions', () => {
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

    describe('given the course has been started', () => {
        const session = SessionBuilder().Build()
        const progress = CourseProgressBuilder().Build()
        const course = CourseBuilder().WithSession(session).WithProgress(progress).Build()

        const mockHistory = {
            push: jest.fn(),
        }

        beforeEach(() => {
            mockUseHistory.mockReturnValue(Mock<History<unknown>>(mockHistory))
        })

        it('should render the start button with text being Continue', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <CourseInformation course={course} />,
                </BrowserRouter>,
            )

            const btn = getByTestId('start-button')
            expect(btn).toHaveTextContent('Continue')
        })

        it('on clicking the Continue button, the page should redirect', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <CourseInformation course={course} />,
                </BrowserRouter>,
            )

            const input = getByTestId('start-button-btn')
            fireEvent.click(input)

            expect(mockHistory.push).toHaveBeenCalledWith(
                `/course/${course.id}/session/${session.id}`,
            )
        })
    })

    describe('given the course has not been started', () => {
        const session = SessionBuilder().Build()
        const course = CourseBuilder().WithSession(session).Build()

        const mockHistory = {
            push: jest.fn(),
        }

        const mockCourseStartedMutation = jest.fn()
        const mockCourseStartedeMutationResponse: MutationTuple<unknown, unknown> = [
            jest.fn(),
            {} as MutationResult<unknown>,
        ]

        beforeEach(() => {
            mockCourseStartedMutation.mockReset()
            mockUseMutation.mockReturnValueOnce(mockCourseStartedeMutationResponse)
            mockUseHistory.mockReturnValue(Mock<History<unknown>>(mockHistory))
        })

        it('should render the start button with text being Continue', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <ProgressContextProvider>
                        <CourseInformation course={course} />,
                    </ProgressContextProvider>
                </BrowserRouter>,
            )

            const btn = getByTestId('start-button')
            expect(btn).toHaveTextContent('Start')
        })

        xit('on clicking the Continue button, the page should redirect and call course started mutation', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <ProgressContextProvider>
                        <CourseInformation course={course} />,
                    </ProgressContextProvider>
                </BrowserRouter>,
            )

            const input = getByTestId('start-button-btn')
            fireEvent.click(input)

            expect(mockHistory.push).toHaveBeenCalledWith(
                `/course/${course.id}/session/${session.id}`,
            )
            expect(mockCourseStartedMutation).toHaveBeenCalledWith({
                variables: { courseID: course.id },
            })
        })
    })

    describe('given the user edits the note for a course', () => {
        const mockNoteUpdateMutation = jest.fn()
        const mockNoteUpdateMutationResponse: MutationTuple<unknown, unknown> = [
            mockNoteUpdateMutation,
            {} as MutationResult<unknown>,
        ]

        beforeEach(() => {
            mockUseMutation.mockReset()
            mockUseMutation.mockReturnValueOnce(mockNoteUpdateMutationResponse)
        })

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

            expect(mockNoteUpdateMutation).toHaveBeenCalledWith({
                variables: { courseID: course.id, value: noteValue },
            })
        })
    })
})
