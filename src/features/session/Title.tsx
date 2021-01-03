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
    const items = [course?.title, session.title, step?.title].filter((x) => !!x)

    return <h1 data-testid="session-header">{items.join(' - ')}</h1>
}
