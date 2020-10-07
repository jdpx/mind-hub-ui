import React from 'react'
import { render, screen } from '@testing-library/react'
import { CourseBuilder } from '../../../builders/course'

import AvailableCourse from './AvailableCourse'
import { BrowserRouter } from 'react-router-dom'

describe('Course', () => {
    const course = CourseBuilder().Build()

    it('should render a course', () => {
        render(
            <BrowserRouter>
                <AvailableCourse course={course} />
            </BrowserRouter>,
        )

        expect(screen.queryByText(course.title)).toBeInTheDocument()
        expect(screen.queryByText('Start')).toBeInTheDocument()
    })

    describe('given the started prop is set', () => {
        it('renders the ProgressBar', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <AvailableCourse started course={course} />
                </BrowserRouter>,
            )

            expect(getByTestId('1-progressbar')).toBeInTheDocument()
            expect(screen.queryByText('Continue')).toBeInTheDocument()
        })
    })
})
