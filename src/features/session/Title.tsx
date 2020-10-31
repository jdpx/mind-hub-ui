import React from 'react'
import { Course, Session, Step } from '../../types/course'

interface Props {
    course?: Course
    session: Session
    step?: Step
}

export default function Title({ course, session, step }: Props) {
    const items = [course?.title, session.title, step?.title].filter((x) => !!x)

    return <h1 data-testid="session-header">{items.join(' - ')}</h1>
}
