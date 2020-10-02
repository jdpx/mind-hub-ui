import React from 'react'
import Course from './Course'

import './Courses.scss'

export function Courses() {
    return (
        <div className="courses">
            <h2>Available Course</h2>
            <div className="course-list">
                <Course />
                <Course started />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
            </div>
        </div>
    )
}
export default Courses
