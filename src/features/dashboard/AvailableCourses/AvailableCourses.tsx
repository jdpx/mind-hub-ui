import React from 'react'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'

import { Course as CourseType } from '../../../types/course'
import './AvailableCourses.scss'
import Course from './AvailableCourse'
import Loading from '../../../components/Loading/Loading'

const COURSES_QUERY = loader('./GET_AVAILABLE_COURSES.gql')

type CoursesData = {
    courses: CourseType[]
}

export function AvailableCourses() {
    const { loading, error, data } = useQuery<CoursesData>(COURSES_QUERY)

    console.log('loading' + loading)

    return (
        <div className="available-courses" data-testid="available-courses">
            <h2>Available Courses</h2>
            <div className="course-list">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <div>{JSON.stringify(error)}</div>
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
