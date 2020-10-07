import React from 'react'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'

import { Course as CourseType } from '../../../types/course'
import './AvailableCourses.scss'
import Course from './AvailableCourse'

const COURSES_QUERY = loader('./GET_AVAILABLE_COURSES.gql')

type CoursesData = {
    courses: CourseType[]
}

export function AvailableCourses() {
    const { loading, data } = useQuery<CoursesData>(COURSES_QUERY)

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
