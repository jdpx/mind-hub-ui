import React from 'react'
import { render, screen } from '@testing-library/react'
import { CourseBuilder } from '../../builders/course'
import { BrowserRouter } from 'react-router-dom'
import CourseInformation from './CourseInformation'
import { SessionBuilder } from '../../builders/session'

describe('Course Information', () => {
    const session = SessionBuilder().Build()
    const sessionTwo = SessionBuilder().ID('111').Build()
    const course = CourseBuilder().WithSession(session).WithSession(sessionTwo).Build()

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

    it('should render sessions', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <CourseInformation course={course} />,
            </BrowserRouter>,
        )

        expect(getByTestId(`course-${course.id}-session-${session.id}`)).toBeTruthy()
    })
})
