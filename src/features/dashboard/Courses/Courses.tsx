import React from 'react'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'

import { Course as CourseType } from '../../../types/course'
import './Courses.scss'
import Course from './Course'

const COURSES_QUERY = loader('./GET_COURSES.gql')

type CoursesData = {
    courses: CourseType[]
}

export function Courses() {
    const { loading, data } = useQuery<CoursesData>(COURSES_QUERY)

    return (
        <div className="courses">
            <h2>Available Course</h2>
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
export default Courses
