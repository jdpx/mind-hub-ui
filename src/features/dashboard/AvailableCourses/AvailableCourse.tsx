import React from 'react'
import ActionButton from 'components/ActionButton/ActionButton'
import { Link } from 'react-router-dom'

import Section from '../../../components/Section/Section'
import { Course as CourseType } from '../../../types/course'
import { Small } from '../../../constants/sizes'
import CourseProgress from './CourseProgress'

interface Props {
    course: CourseType
}

export default function AvailableCourse({ course }: Props) {
    const { id, title, description, sessionCount, progress = {} } = course
    const { started, sessionsCompleted } = progress

    return (
        <Section size={Small} testid={id}>
            <Link to={{ pathname: `/course/${id}` }} className="course">
                <h3>{title}</h3>
                <div className="course-description">{description}</div>
                {started && (
                    <div className="course-progress" data-testid={`${id}-progressbar`}>
                        <CourseProgress totalCount={sessionCount} completed={sessionsCompleted} />
                    </div>
                )}
                <ActionButton text={started ? 'Continue' : 'Start'} />
            </Link>
        </Section>
    )
}
