import React from 'react'
import { Course } from '../../types/course'
import { Step } from '../../types/step'
import { Session } from '../../types/session'

interface Props {
    course?: Course
    session: Session
    step?: Step
}

export default function Title({ course, session, step }: Props) {
    const items = [session.title, step?.title].filter((x) => !!x)

    return (
        <div>
            <h2 data-testid="course-header">{course?.title}</h2>
            <h3 data-testid="session-header">{items.join(' - ')}</h3>
        </div>
    )
}
