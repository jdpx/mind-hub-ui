import React from 'react'
import { loader } from 'graphql.macro'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import Section from '../../components/Section/Section'
import { Course } from '../../types/course'
import CourseSession from './CourseSession'

import ActionButton from '../../components/ActionButton/ActionButton'
import { Right } from '../../constants/buttons'
import NoAvailableSessions from './NoSessions'
import Notes from '../../components/Notes/Notes'

import './Course.scss'
import useProgress from '../../hooks/useProgress'

const UPDATE_COURSE_MUTATION = loader('./UPDATE_COURSE_NOTE.gql')

interface Props {
    course: Course
}

export default function CourseInformation({ course }: Props) {
    const { id, title, description, sessions = [], note, progress = {} } = course

    const [updateCourseNote] = useMutation(UPDATE_COURSE_MUTATION)
    const { startCourse } = useProgress()

    const history = useHistory()

    const handleNoteSave = (value: string) => {
        console.log('updateCourseNote called')
        updateCourseNote({ variables: { courseID: course.id, value: value } })
    }

    const handleCourseStart = () => {
        if (!progress || !progress.started) {
            console.log('startCourse called')
            startCourse(course.id)
        }
        history.push(`/course/${id}/session/${sessions[0].id}`)
    }

    return (
        <div className="container" data-testid="course-information">
            <div className="course">
                <h1 data-testid="course-header">{title}</h1>
                <div className="course-description">{description}</div>
                <div className="row">
                    <div className="col">
                        <Section>
                            <div className="course-sessions" data-testid="course-sessions">
                                {sessions && sessions.length > 0 ? (
                                    sessions.map((session, index) => (
                                        <CourseSession
                                            key={session.id}
                                            courseID={id}
                                            session={session}
                                            alternate={index % 2 !== 0}
                                            testid={`course-${id}-session-${session.id}`}
                                        />
                                    ))
                                ) : (
                                    <NoAvailableSessions />
                                )}
                            </div>
                        </Section>
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
                        <Notes
                            note={note}
                            handleSave={handleNoteSave}
                            testid={`course-${id}-notes`}
                        />
                        {sessions.length > 0 && (
                            <div className="course-start-button">
                                <ActionButton
                                    text={progress && progress.started ? 'Continue' : 'Start'}
                                    onClick={handleCourseStart}
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
