import React from 'react'

import Section from '../../components/Section/Section'
import { Course } from '../../types/course'
import ActionButton from '../../components/ActionButton/ActionButton'
import { Right } from '../../constants/buttons'
import SessionList from './SessionInformation/SessionList'

import './Course.scss'

interface Props {
    course: Course
    onNoteSave: (value: string) => void
    onCourseStart: () => void
}

export default function CourseInformation({ course, onCourseStart }: Props) {
    const { id, title, description, sessions = [], progress } = course

    return (
        <div className="container" data-testid="course-information">
            <div className="course">
                <h2 data-testid="course-header">{title}</h2>
                <div className="course-description" data-testid="course-description">
                    {description}
                </div>
                <div className="row">
                    <div className="col">
                        <SessionList courseID={id} />
                        <div className="row">
                            <div className="col">
                                <Section disabled>
                                    <div className="course-worry-diary">Practises</div>
                                </Section>
                            </div>
                            <div className="col" />
                            <div className="col" />
                            <div className="col" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {sessions.length > 0 && (
                            <div className="course-start-button">
                                <ActionButton
                                    text={!!progress ? 'Continue' : 'Start'}
                                    onClick={onCourseStart}
                                    position={Right}
                                    testid="start-button"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
