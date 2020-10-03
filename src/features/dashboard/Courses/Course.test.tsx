import React from 'react'
import { render, screen } from '@testing-library/react'
import { CourseBuilder } from '../../../builders/course'

import Course from './Course'

describe('Course', () => {
    const course = CourseBuilder().Build()

    it('should render a course', () => {
        render(<Course course={course} />)

        expect(screen.queryByText(course.title)).toBeInTheDocument()
    })

    describe('given the started prop is set', () => {
        it('renders the ProgressBar', () => {
            const { getByTestId } = render(<Course started course={course} />)

            expect(getByTestId('1-progressbar')).toBeInTheDocument()
        })
    })
})
