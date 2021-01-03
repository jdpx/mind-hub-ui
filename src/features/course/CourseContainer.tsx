import React from 'react'
import useNotes from '../../hooks/useNotes'
import useProgress from '../../hooks/useProgress'
import { Course } from '../../types/course'
import CourseInformation from './CourseInformation'

interface Props {
    course: Course
    redirectToSession: (id: string) => void
}

export default function CourseContainer({ course, redirectToSession }: Props) {
    const { startCourse } = useProgress()

    const onCourseStart = () => {
        const { progress, sessions = [] } = course

        if (!progress) {
            startCourse(course.id)
        }

        redirectToSession(sessions[0].id)
    }

    const { updateCourseNote } = useNotes()

    const onNoteSave = (value: string) => {
        updateCourseNote(course.id, value)
    }

    return (
        <CourseInformation course={course} onNoteSave={onNoteSave} onCourseStart={onCourseStart} />
    )
}
