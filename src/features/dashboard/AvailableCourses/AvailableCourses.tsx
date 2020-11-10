import React, { useEffect } from 'react'
import { loader } from 'graphql.macro'
import { useLazyQuery } from '@apollo/client'

import { Course as CourseType } from '../../../types/course'
import './AvailableCourses.scss'
import Course from './AvailableCourse'

const COURSES_QUERY = loader('./GET_AVAILABLE_COURSES.gql')

type CoursesData = {
    courses: CourseType[]
}

export function AvailableCourses() {
    const [getAvailableCourses, { loading, data }] = useLazyQuery<CoursesData>(COURSES_QUERY)

    useEffect(() => {
        getAvailableCourses()
    }, [getAvailableCourses])

    return (
        <div className="available-courses" data-testid="available-courses">
            <h2>Available Courses</h2>
            <div className="course-list">
                {loading ? (
                    <div>Loading</div>
                ) : (
                    data &&
                    data.courses.map((course: CourseType) => (
                        <Course key={course.id} course={course} />
                    ))
                )}
            </div>
        </div>
    )
}
export default AvailableCourses
