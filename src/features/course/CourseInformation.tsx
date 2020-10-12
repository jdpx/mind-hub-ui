import React from 'react'
import Section from '../../components/Section/Section'
import { Course } from '../../types/course'
import CourseSession from './CourseSession'

import './Course.scss'
import ActionButton from '../../components/ActionButton/ActionButton'
import { Right } from '../../constants/buttons'

interface Props {
    course: Course
}

export default function CourseInformation({ course }: Props) {
    const { id, title, description, sessions = [] } = course

    return (
        <div className="container" data-testid="course-information">
            <div className="course">
                <h1 data-testid="course-header">{title}</h1>
                <div className="course-description">{description}</div>
                <div className="row">
                    <div className="col">
                        {sessions && (
                            <Section>
                                <div className="course-sessions">
                                    {sessions.map((session, index) => (
                                        <CourseSession
                                            key={session.id}
                                            courseID={id}
                                            session={session}
                                            alternate={index % 2 !== 0}
                                            testid={`course-${id}-session-${session.id}`}
                                        />
                                    ))}
                                </div>
                            </Section>
                        )}
                        <div className="row">
                            <div className="col">
                                <Section disabled>
                                    <div className="course-worry-diary">Worry Diary</div>
                                </Section>
                            </div>
                            <div className="col">
                                <Section disabled>
                                    <div className="course-worry-diary">Practises</div>
                                </Section>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <Section title="Notes">
                            <div className="course-notes">
                                Culpa eu deserunt deserunt labore duis laboris tempor elit pariatur
                                aliqua enim amet officia. Ex irure ut pariatur duis ut. Culpa elit
                                ullamco anim aute eu eiusmod consectetur adipisicing laboris eiusmod
                                commodo non nostrud. Incididunt ullamco mollit officia culpa
                                pariatur mollit aliquip. Non laborum veniam id enim minim minim et
                                incididunt amet. Esse elit ipsum reprehenderit magna sint irure
                                incididunt ut. Occaecat ut proident id quis quis do cillum voluptate
                                exercitation incididunt mollit et reprehenderit.
                            </div>
                        </Section>
                        <div className="course-start-button">
                            <ActionButton text="Start" position={Right} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
