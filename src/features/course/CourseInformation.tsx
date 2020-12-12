import React from 'react'
import { useHistory } from 'react-router-dom'

import Section from '../../components/Section/Section'
import { Course } from '../../types/course'
import ActionButton from '../../components/ActionButton/ActionButton'
import { Right } from '../../constants/buttons'
import Notes from '../../components/Notes/Notes'
import useProgress from '../../hooks/useProgress'
import SessionList from './SessionInformation/SessionList'
import useNotes from '../../hooks/useNotes'

import './Course.scss'

interface Props {
    course: Course
}

export default function CourseInformation({ course }: Props) {
    const { id, title, description, sessions = [], note, progress } = course

    const { updateCourseNote } = useNotes()
    const { startCourse } = useProgress()

    const history = useHistory()

    const handleNoteSave = (value: string) => {
        updateCourseNote({ variables: { courseID: course.id, value: value } })
    }

    const handleCourseStart = () => {
        if (!progress) {
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
                        <SessionList courseID={id} />
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
                                    text={!!progress ? 'Continue' : 'Start'}
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
