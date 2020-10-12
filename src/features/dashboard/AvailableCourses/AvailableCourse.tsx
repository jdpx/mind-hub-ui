import React from 'react'
import ActionButton from 'components/ActionButton/ActionButton'
import { Link } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'

import Section from '../../../components/Section/Section'
import { Course as CourseType } from '../../../types/course'
import { Small } from '../../../constants/sizes'

interface Props {
    course: CourseType
    started?: boolean
}

export default function AvailableCourse({ course, started }: Props) {
    const { id, title, description } = course

    return (
        <Section size={Small} testid={id}>
            <Link
                to={{ pathname: `/course/${id}` }}
                className="course"
                data-testid={`available-courses-${id}`}
            >
                <h3>{title}</h3>
                <div className="course-description">{description}</div>
                {started && (
                    <div className="course-progress" data-testid={`${id}-progressbar`}>
                        <ProgressBar now={60} />
                    </div>
                )}
                <ActionButton text={started ? 'Continue' : 'Start'} />
            </Link>
        </Section>
    )
}
