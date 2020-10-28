import React from 'react'
import { render, screen } from '@testing-library/react'
import { CourseBuilder } from '../../../builders/course'

import AvailableCourse from './AvailableCourse'
import { BrowserRouter } from 'react-router-dom'
import { ProgressBuilder } from '../../../builders/progress'

describe('Available Course', () => {
    const course = CourseBuilder().Build()

    describe('given a course that has not been started yet', () => {
        it('should render a course with start button', () => {
            render(
                <BrowserRouter>
                    <AvailableCourse course={course} />
                </BrowserRouter>,
            )

            expect(screen.queryByText(course.title)).toBeInTheDocument()
            expect(screen.queryByText('Start')).toBeInTheDocument()
        })
    })

    describe('given a course that has been started', () => {
        const progress = ProgressBuilder().Build()
        const course = CourseBuilder().WithProgress(progress).Build()

        it('should render the continue button', () => {
            render(
                <BrowserRouter>
                    <AvailableCourse course={course} />
                </BrowserRouter>,
            )

            expect(screen.queryByText('Continue')).toBeInTheDocument()
        })

        it('should render the progess bar', () => {
            const { getByTestId } = render(
                <BrowserRouter>
                    <AvailableCourse course={course} />
                </BrowserRouter>,
            )

            expect(getByTestId('1-progressbar')).toBeInTheDocument()
        })
    })
})
