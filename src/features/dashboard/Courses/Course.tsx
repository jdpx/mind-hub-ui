import React from 'react'
import ActionButton from 'components/ActionButton/ActionButton'
import Section from '../../../components/Section/Section'
import { ProgressBar } from 'react-bootstrap'
import { Course as CourseType } from '../../../types/course'

interface Props {
    course: CourseType
    started?: boolean
}

export default function Course({ course, started }: Props) {
    const { id, title } = course

    return (
        <Section testid={id}>
            <div className="course">
                <h3>{title}</h3>
                <div className="course-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra, augue vitae
                    tortor etiam cursus fames risus ut.
                </div>
                {started && (
                    <div className="course-progress" data-testid={`${id}-progressbar`}>
                        <ProgressBar now={60} />
                    </div>
                )}
                <ActionButton text={started ? 'Continue' : 'Start'} />
            </div>
        </Section>
    )
}