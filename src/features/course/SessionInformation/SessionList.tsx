import React, { useEffect } from 'react'
import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel'
import Section from '../../../components/Section/Section'
import useSessions from '../../../hooks/useSessions'
import NoAvailableSessions from '../NoSessions'
import SessionInformation from './SessionInformation'

interface Props {
    courseID: string
}

export default function SessionList({ courseID }: Props) {
    const { useSessionsByCourseID } = useSessions()
    const { getSessionsByCourseID, loading, sessions, error } = useSessionsByCourseID(courseID)

    useEffect(() => {
        getSessionsByCourseID()
    }, [getSessionsByCourseID])

    if (loading) {
        return <></>
    }

    if (error) {
        return (
            <Section>
                <ErrorPanel />
            </Section>
        )
    }

    return (
        <Section>
            <div className="course-sessions" data-testid="course-sessions">
                {sessions.length === 0 ? (
                    <NoAvailableSessions />
                ) : (
                    sessions.map((session, index) => (
                        <SessionInformation
                            key={session.id}
                            courseID={courseID}
                            session={session}
                            alternate={index % 2 !== 0}
                            testid={`course-${courseID}-session-${session.id}`}
                        />
                    ))
                )}
            </div>
        </Section>
    )
}
