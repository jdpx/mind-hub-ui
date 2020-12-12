import React, { useEffect } from 'react'

import { Course as CourseType } from '../../../types/course'
import Course from './AvailableCourse'
import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel'
import useCourse from '../../../hooks/useCourse'

import './AvailableCourses.scss'

export function AvailableCourses() {
    const { useGetAll } = useCourse()
    const { get, loading, courses, error } = useGetAll()

    useEffect(() => {
        get()
    }, [get])

    return (
        <div className="available-courses" data-testid="available-courses">
            <h2>Available Courses</h2>
            <div className="course-list">
                {loading ? (
                    <div>Loading</div>
                ) : error ? (
                    <ErrorPanel />
                ) : (
                    courses.map((course: CourseType) => <Course key={course.id} course={course} />)
                )}
            </div>
        </div>
    )
}
export default AvailableCourses
