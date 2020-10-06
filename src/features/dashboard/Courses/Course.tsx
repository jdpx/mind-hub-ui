import React from 'react'
import ActionButton from 'components/ActionButton/ActionButton'
import Section from '../../../components/Section/Section'
import { ProgressBar } from 'react-bootstrap'
import { Course as CourseType } from '../../../types/course'
import { Link } from 'react-router-dom'

interface Props {
    course: CourseType
    started?: boolean
}

export default function Course({ course, started }: Props) {
    const { id, title, description } = course

    return (
        <Section testid={id}>
            <Link to={{ pathname: `/course/${id}` }} className="course">
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
