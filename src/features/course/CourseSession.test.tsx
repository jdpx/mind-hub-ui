import React from 'react'
import { render, screen } from '@testing-library/react'
import faker from 'faker'

import { SessionBuilder } from '../../builders/session'
import CourseSession from './CourseSession'
import { BrowserRouter } from 'react-router-dom'

describe('Course Session', () => {
    const session = SessionBuilder().Build()
    const courseID = faker.lorem.slug()

    it('should render a link to the course session page', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <CourseSession courseID={courseID} session={session} testid="test" />,
            </BrowserRouter>,
        )

        expect(getByTestId('test')).toHaveAttribute(
            'href',
            `course/${courseID}/session/${session.id}`,
        )
        expect(screen.queryByText(session.title)).toBeInTheDocument()
    })

    it('should render an alternate class', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <CourseSession courseID={courseID} session={session} alternate testid="test" />,
            </BrowserRouter>,
        )

        expect(getByTestId('test')).toHaveClass('course-session alternate')
    })
})
